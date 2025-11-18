// src/app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getBlogPosts } from '@/lib/getBlogPosts';
import { createOrUpdatePost } from '@/lib/github';

export async function GET() {
  try {
    const posts = await getBlogPosts();
    const simplified = posts.map(post => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      category: post.category,
    }));
    return NextResponse.json(simplified);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

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
      data.slug,
      frontmatter,
      `Create post: ${data.title}`
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
