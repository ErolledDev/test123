// src/app/admin/edit/[slug]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import PostEditor from '@/components/PostEditor';

export default function EditPost({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }

    fetchPost();
  }, [params.slug, router]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${params.slug}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data);
      } else {
        alert('Post not found');
        router.push('/admin');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      alert('Error loading post');
      router.push('/admin');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated() || loading) {
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
          <h1 className="text-2xl font-bold text-gray-900">Edit Post</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          {post && <PostEditor initialData={post} isEdit={true} />}
        </div>
      </div>
    </div>
  );
}
