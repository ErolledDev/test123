// src/components/BlogList.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import ClientSideImage from './ClientSideImage';
import { BlogPostProps } from '@/lib/getBlogPosts';
import ErrorBoundary from '@/components/ErrorBoundary';

const BlogList: React.FC<{ posts: BlogPostProps[] }> = ({ posts }) => {
  return (
    <ErrorBoundary fallback={<div>Error loading blog posts</div>}>
      <div className="bg-gradient-to-b from-gray-100 to-white w-full text-xl md:text-2xl text-gray-800 leading-normal rounded-t">
        {posts.length === 0 ? (
          <div className="text-center py-10">No posts found</div>
        ) : (
          posts.map((post, index) => (
            <React.Fragment key={post.slug}>
              {index === 0 ? <FeaturedPost post={post} /> : <RegularPost post={post} />}
            </React.Fragment>
          ))
        )}
      </div>
    </ErrorBoundary>
  );
};

const FeaturedPost: React.FC<{ post: BlogPostProps }> = ({ post }) => (
  <ErrorBoundary fallback={<div>Error loading featured post</div>}>
    <div className="flex flex-col md:flex-row h-full bg-white rounded-lg overflow-hidden shadow-lg mb-8">
      <Link href={`/blog/${post.slug}`} className="flex flex-wrap no-underline hover:no-underline w-full">
        <div className="w-full md:w-2/3 rounded-t md:rounded-l md:rounded-t-none">
          <ClientSideImage
            src={post.coverImage}
            alt={`Cover image for ${post.title}`}
            width={800}
            height={600}
            className="h-64 md:h-full w-full object-cover shadow"
          />
        </div>
        <div className="w-full md:w-1/3 flex flex-col flex-grow flex-shrink">
          <div className="flex-1 bg-white overflow-hidden">
            <p className="w-full text-gray-600 text-xs md:text-sm pt-6 px-6">{post.category.toUpperCase()}</p>
            <div className="w-full font-bold text-xl text-gray-900 px-6 my-2">{post.title}</div>
            <p className="text-gray-800 font-serif text-base px-6 mb-5">{post.excerpt}</p>
          </div>
          <div className="flex-none mt-auto bg-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ClientSideImage
                  className="w-8 h-8 rounded-full mr-4 avatar"
                  data-tippy-content={post.author}
                  src={post.authorImage}
                  alt="Avatar of Author"
                  width={32}
                  height={32}
                />
                <p className="text-gray-600 text-xs md:text-sm">{post.author}</p>
              </div>
              <p className="text-gray-600 text-xs md:text-sm">{post.readingTime}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  </ErrorBoundary>
);

const RegularPost: React.FC<{ post: BlogPostProps }> = ({ post }) => (
  <ErrorBoundary fallback={<div>Error loading post</div>}>
    <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
      <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
        <Link href={`/blog/${post.slug}`} className="flex flex-wrap no-underline hover:no-underline">
          <ClientSideImage
            src={post.coverImage}
            alt={`Cover image for ${post.title}`}
            width={800}
            height={600}
            className="h-64 w-full rounded-t object-cover"
          />
          <div className="w-full p-6">
            <p className="text-gray-600 text-xs md:text-sm">{post.category.toUpperCase()}</p>
            <div className="w-full font-bold text-xl text-gray-900 my-2">{post.title}</div>
            <p className="text-gray-800 font-serif text-base mb-5">{post.excerpt}</p>
          </div>
        </Link>
      </div>
      <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ClientSideImage
              className="w-8 h-8 rounded-full mr-4 avatar"
              data-tippy-content={post.author}
              src={post.authorImage}
              alt="Avatar of Author"
              width={32}
              height={32}
            />
            <p className="text-gray-600 text-xs md:text-sm">{post.author}</p>
          </div>
          <p className="text-gray-600 text-xs md:text-sm">{post.readingTime}</p>
        </div>
      </div>
    </div>
  </ErrorBoundary>
);

export default BlogList;


