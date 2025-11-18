// src/app/blog/[slug]/page.tsx
import { getBlogPosts, BlogPostProps } from '@/lib/getBlogPosts';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Dynamically import client components
const BlogPost = dynamic(() => import('@/components/BlogPost'), {
  ssr: true
});

const ErrorBoundary = dynamic(() => import('@/components/ErrorBoundary'), {
  ssr: false
});

export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const posts = await getBlogPosts();
    const post = posts.find((p) => p.slug === params.slug);
    
    if (!post) {
      return {
        title: 'Post Not Found',
      };
    }

    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: post.coverImage ? [{ url: post.coverImage }] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: post.coverImage ? [post.coverImage] : undefined,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Error',
      description: 'An error occurred while generating metadata',
    };
  }
}

const getRelatedPosts = (currentPost: BlogPostProps, allPosts: BlogPostProps[], limit = 3): BlogPostProps[] => {
  return allPosts
    .filter(p => p.slug !== currentPost.slug)
    .sort((a, b) => {
      const aCommonTags = a.tags?.filter(tag => currentPost.tags?.includes(tag)).length ?? 0;
      const bCommonTags = b.tags?.filter(tag => currentPost.tags?.includes(tag)).length ?? 0;
      return bCommonTags - aCommonTags;
    })
    .slice(0, limit);
};

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  try {
    const posts = await getBlogPosts();
    const post = posts.find((p) => p.slug === params.slug);

    if (!post) {
      notFound();
    }

    const relatedPosts = getRelatedPosts(post, posts);

    return (
      <ErrorBoundary fallback={
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Error Rendering Blog Post</h1>
          <p>We&apos;re sorry, but an error occurred while trying to render this blog post.</p>
          <Link href="/blog" className="text-blue-500 hover:underline mt-4 inline-block">
            Return to Blog
          </Link>
        </div>
      }>
        <BlogPost post={post} relatedPosts={relatedPosts} />
      </ErrorBoundary>
    );
  } catch (error) {
    console.error('Error in BlogPostPage:', error);
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Error Loading Blog Post</h1>
        <p>We&apos;re sorry, but an error occurred while trying to load this blog post.</p>
        <p className="text-sm text-gray-600 mt-2">Error details: {error instanceof Error ? error.message : String(error)}</p>
        <Link href="/blog" className="text-blue-500 hover:underline mt-4 inline-block">
          Return to Blog
        </Link>
      </div>
    );
  }
}