// src/app/api/posts/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getBlogPosts } from '@/lib/getBlogPosts';
import { createOrUpdatePost, deletePost, getPostSha } from '@/lib/github';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const posts = await getBlogPosts();
    const post = posts.find(p => p.slug === params.slug);

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const data = await request.json();

    const sha = await getPostSha(params.slug);
    if (!sha) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    const frontmatter = `---
title: "${data.title}"
date: "${data.date}"
excerpt: "${data.excerpt}"
category: "${data.category}"
tags: [${data.tags.map((tag: string) => `"${tag}"`).join(', ')}]
coverImage: "${data.coverImage || ''}"
author: "${data.author || ''}"
authorImage: "${data.authorImage || ''}"
authorBio: "${data.authorBio || ''}"
---

${data.content}`;

    await createOrUpdatePost(
      params.slug,
      frontmatter,
      `Update post: ${data.title}`,
      sha
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const sha = await getPostSha(params.slug);
    if (!sha) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    await deletePost(params.slug, sha);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
