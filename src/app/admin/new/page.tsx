// src/app/admin/new/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import PostEditor from '@/components/PostEditor';

export default function NewPost() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
    }
  }, [router]);

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <PostEditor />
        </div>
      </div>
    </div>
  );
}
