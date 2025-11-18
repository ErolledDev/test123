// src/app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, setAuthenticated } from '@/lib/auth';
import Link from 'next/link';
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt } from 'react-icons/fa';

interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }

    fetchPosts();
  }, [router]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const response = await fetch(`/api/posts/${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(posts.filter(p => p.slug !== slug));
      } else {
        alert('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Blog Admin</h1>
            <div className="flex gap-4">
              <Link
                href="/blog"
                className="text-gray-600 hover:text-gray-900"
              >
                View Blog
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 hover:text-red-800"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            href="/admin/new"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaPlus />
            New Post
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    No posts yet. Create your first post!
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.slug}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {post.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{post.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/admin/edit/${post.slug}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <FaEdit className="inline" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.slug)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash className="inline" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
