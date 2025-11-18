// src/app/blog/page.tsx
import React from 'react';
import { getBlogPosts } from '@/lib/getBlogPosts';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';

// Dynamically import client components
const BlogList = dynamic(() => import('@/components/BlogList'), {
  ssr: true
});

const ErrorBoundary = dynamic(() => import('@/components/ErrorBoundary'), {
  ssr: false
});

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read our latest blog posts',
};

export default async function BlogPage() {
  try {
    const posts = await getBlogPosts();

    return (
      <ErrorBoundary fallback={<div className="text-center py-10">An error occurred while loading the blog posts. Please try again later.</div>}>
        <main className="min-h-screen bg-gradient-to-b from-gray-100 to-white font-sans leading-normal tracking-normal">
          <div className="w-full m-0 p-0 bg-cover bg-bottom relative" style={{
            height: "60vh",
            maxHeight: "460px",
            backgroundColor: "#4A90E2"
          }}>
            <div className="container max-w-4xl mx-auto pt-16 md:pt-32 text-center break-normal relative z-10">
              <h1 className="text-white font-extrabold text-3xl md:text-5xl mb-4">
                Blog
              </h1>
              <p className="text-xl md:text-2xl text-gray-200">
                Thoughts, stories and ideas
              </p>
            </div>
          </div>

          <div className="container px-4 md:px-0 max-w-6xl mx-auto -mt-32 relative z-20">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <BlogList posts={posts} />
            </div>
          </div>
        </main>
      </ErrorBoundary>
    );
  } catch (error) {
    console.error('Error in BlogPage:', error);
    return <div className="text-center py-10">An error occurred while loading the blog page. Please try again later.</div>;
  }
}