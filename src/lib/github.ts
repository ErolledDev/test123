// src/lib/github.ts

const GITHUB_API = 'https://api.github.com';
const GITHUB_REPO = process.env.GITHUB_REPO || '';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

interface GitHubFile {
  name: string;
  path: string;
  sha: string;
  content?: string;
}

export async function createOrUpdatePost(
  slug: string,
  content: string,
  message: string,
  sha?: string
): Promise<void> {
  const path = `${slug}.md`;
  const url = `${GITHUB_API}/repos/${GITHUB_REPO}/contents/${path}`;

  const body: any = {
    message,
    content: Buffer.from(content).toString('base64'),
  };

  if (sha) {
    body.sha = sha;
  }

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to save post: ${error}`);
  }
}

export async function deletePost(slug: string, sha: string): Promise<void> {
  const path = `${slug}.md`;
  const url = `${GITHUB_API}/repos/${GITHUB_REPO}/contents/${path}`;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `Delete post: ${slug}`,
      sha,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to delete post: ${error}`);
  }
}

export async function getPostSha(slug: string): Promise<string | null> {
  const path = `${slug}.md`;
  const url = `${GITHUB_API}/repos/${GITHUB_REPO}/contents/${path}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const data: GitHubFile = await response.json();
    return data.sha;
  } catch (error) {
    return null;
  }
}
