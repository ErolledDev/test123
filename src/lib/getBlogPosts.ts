// src/lib/getBlogPosts.ts
import matter from 'gray-matter';
import { markdownToHtml } from './markdown';
import readingTime from 'reading-time';

export interface BlogPostProps {
  slug: string;
  title: string;
  date: string;
  content: string;
  htmlContent: string;
  excerpt: string;
  category: string;
  tags: string[];
  coverImage: string;
  author: string;
  authorImage: string;
  authorBio: string;
  readingTime: string;
}

// Get these from environment variables
const GITHUB_REPO = process.env.GITHUB_REPO || 'username/repo';
const GITHUB_API = `https://api.github.com/repos/${GITHUB_REPO}/contents`;
const GITHUB_RAW = `https://raw.githubusercontent.com/${GITHUB_REPO}/main`;

export async function getBlogPosts(): Promise<BlogPostProps[]> {
  console.log('Fetching blog posts from GitHub...');

  try {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'NextJS-Blog',
      'Cache-Control': 'no-cache',
      'If-None-Match': '', // Bypass ETag caching        
    };

    // Add GitHub token if available
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(GITHUB_API, { headers });

    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response.status}: ${await response.text()}`);
    }

    const files: any[] = await response.json();
    const mdFiles = files.filter(file => file.name.endsWith('.md'));

    console.log(`Found ${mdFiles.length} Markdown files`);

    const posts = await Promise.all(mdFiles.map(async (file) => {
      try {
        const contentResponse = await fetch(`${GITHUB_RAW}/${file.path}`, { headers });

        if (!contentResponse.ok) {
          throw new Error(`Failed to fetch content for ${file.name}: ${contentResponse.status}`);
        }

        const content = await contentResponse.text();
        const { data, content: markdown } = matter(content);

        // Validate required fields
        if (!data.title || !data.date) {
          console.warn(`Warning: Required fields missing in ${file.name}`);
          data.title = data.title || 'Untitled';
          data.date = data.date || new Date().toISOString();
        }

        // Convert markdown to HTML
        const htmlContent = await markdownToHtml(markdown);

        const post: BlogPostProps = {
          slug: file.name.replace('.md', ''),
          title: data.title,
          date: new Date(data.date).toISOString(),
          content: markdown,
          htmlContent,
          excerpt: data.excerpt || '',
          category: data.category || 'Uncategorized',
          tags: data.tags || [],
          coverImage: data.coverImage || '/images/default-cover.jpg',
          author: data.author || 'Anonymous',
          authorImage: data.authorImage || '/images/default-avatar.jpg',
          authorBio: data.authorBio || '',
          readingTime: readingTime(markdown).text,
        };

        return post;
      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);
        return null;
      }
    }));

    // Filter out any null posts and sort by date
    const validPosts = posts.filter((post): post is BlogPostProps => post !== null);
    const sortedPosts = validPosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return sortedPosts;
  } catch (error) {
    console.error('Error in getBlogPosts:', error);
    throw error;
  }
}