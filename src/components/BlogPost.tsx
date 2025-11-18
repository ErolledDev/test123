/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
// src/components/BlogPost.tsx

"use client";

import React from "react";
import Link from "next/link";
import { formatDate } from "@/utils/dateFormatter";
import { BlogPostProps } from "@/lib/getBlogPosts";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import RelatedPosts from "./RelatedPosts";
import ErrorBoundary from "./ErrorBoundary";
import ScrollProgressBar from "./ScrollProgressBar";
import SocialShare from "./SocialShare";
import ClientSideImage from "./ClientSideImage";

const BlogPost: React.FC<{
  post: BlogPostProps;
  relatedPosts: BlogPostProps[];
}> = ({ post, relatedPosts }) => {
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        Error: Post data is missing
      </div>
    );
  }

  const renderHTMLContent = () => {
    if (!post.htmlContent) {
      return <div className="text-red-500">Error: HTML content is missing</div>;
    }

    return (
      <div
        className="prose lg:prose-xl"
        dangerouslySetInnerHTML={{ __html: post.htmlContent }}
      />
    );
  };

  return (
    <div className="bg-gray-100 font-sans leading-normal tracking-normal">
      <ErrorBoundary fallback={<div>Error loading header</div>}>
        <header className="fixed w-full z-10 top-0 bg-white shadow">
          <ScrollProgressBar />
          <nav className="container mx-auto px-4 py-2">
            <Link href="/blog" className="text-gray-800 hover:text-gray-600">
              ← Back to Blog
            </Link>
          </nav>
        </header>
      </ErrorBoundary>

      <div className="w-full h-64 md:h-96 relative pt-16">
        {post.coverImage ? (
          <ClientSideImage
            src={post.coverImage}
            alt={`Cover image for ${post.title}`}
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            className="rounded-b-lg shadow-lg"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600">No cover image available</span>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <ErrorBoundary fallback={<div>Error loading post meta</div>}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              {post.authorImage ? (
                <ClientSideImage
                  src={post.authorImage}
                  alt={`Profile picture of ${post.author}`}
                  width={64}
                  height={64}
                  className="rounded-full mr-4"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600">?</span>
                </div>
              )}
              <div>
                {post.author && (
                  <p className="font-semibold text-gray-800">{post.author}</p>
                )}
                {post.date && (
                  <p className="text-sm text-gray-600">
                    {formatDate(post.date)}
                  </p>
                )}
              </div>
            </div>
            {post.readingTime && (
              <p className="text-sm text-gray-600">{post.readingTime}</p>
            )}
          </div>
        </ErrorBoundary>

        <ErrorBoundary fallback={<div>Error loading post title</div>}>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {post.title || "Untitled Post"}
          </h1>
        </ErrorBoundary>

        <ErrorBoundary fallback={<div>Error loading social share</div>}>
          <SocialShare title={post.title || "Untitled Post"} />
        </ErrorBoundary>

        <ErrorBoundary fallback={<div>Error loading post content</div>}>
          {renderHTMLContent()}
        </ErrorBoundary>

        <ErrorBoundary fallback={<div>Error loading tags</div>}>
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </ErrorBoundary>

        <ErrorBoundary fallback={<div>Error loading author bio</div>}>
          {post.author && (
            <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                {post.authorImage ? (
                  <ClientSideImage
                    src={post.authorImage}
                    alt={post.author}
                    width={64}
                    height={64}
                    className="rounded-full mr-4"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-300 rounded-full mr-4 flex items-center justify-center">
                    <span className="text-gray-600">?</span>
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold">{post.author}</h3>
                  {post.authorBio && (
                    <p className="text-gray-600">{post.authorBio}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </ErrorBoundary>

        <ErrorBoundary fallback={<div>Error loading related posts</div>}>
          {relatedPosts && relatedPosts.length > 0 && (
            <RelatedPosts posts={relatedPosts} />
          )}
        </ErrorBoundary>
      </div>

      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            Built with NextJS GitHub Markdown Blog
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogPost;
