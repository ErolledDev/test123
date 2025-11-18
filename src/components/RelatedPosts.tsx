// src/components/RelatedPosts.tsx
import React from 'react';
import Link from 'next/link';
import ClientSideImage from './ClientSideImage';
import { BlogPostProps } from '@/lib/getBlogPosts';
import ErrorBoundary from './ErrorBoundary';

const RelatedPosts: React.FC<{ posts: BlogPostProps[] }> = ({ posts }) => {
  return (
    <ErrorBoundary fallback={<div>Error loading related posts</div>}>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                <ClientSideImage
                  src={post.coverImage}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="object-cover w-full h-48"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm">{post.excerpt}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default RelatedPosts;

