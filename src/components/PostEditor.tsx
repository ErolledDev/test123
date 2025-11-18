// src/components/PostEditor.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface PostEditorProps {
  initialData?: {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    category: string;
    tags: string[];
    coverImage: string;
    author: string;
    authorImage: string;
    authorBio: string;
    content: string;
  };
  isEdit?: boolean;
}

export default function PostEditor({ initialData, isEdit = false }: PostEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    slug: initialData?.slug || '',
    title: initialData?.title || '',
    date: initialData?.date || new Date().toISOString().split('T')[0],
    excerpt: initialData?.excerpt || '',
    category: initialData?.category || '',
    tags: initialData?.tags?.join(', ') || '',
    coverImage: initialData?.coverImage || '',
    author: initialData?.author || '',
    authorImage: initialData?.authorImage || '',
    authorBio: initialData?.authorBio || '',
    content: initialData?.content || '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      };

      const response = await fetch(
        isEdit ? `/api/posts/${formData.slug}` : '/api/posts',
        {
          method: isEdit ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        }
      );

      if (response.ok) {
        router.push('/admin');
      } else {
        const error = await response.json();
        alert(`Error: ${error.message || 'Failed to save post'}`);
      }
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error saving post');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slug (URL-friendly name)
          </label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            disabled={isEdit}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            placeholder="my-blog-post"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="My Awesome Blog Post"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Excerpt
        </label>
        <textarea
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          required
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="A brief description of your post"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Technology"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="nextjs, react, blogging"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cover Image URL
        </label>
        <input
          type="url"
          name="coverImage"
          value={formData.coverImage}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Author Name
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Author Image URL
          </label>
          <input
            type="url"
            name="authorImage"
            value={formData.authorImage}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/avatar.jpg"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Author Bio
        </label>
        <textarea
          name="authorBio"
          value={formData.authorBio}
          onChange={handleChange}
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="A short bio about the author"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content (Markdown)
        </label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={20}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          placeholder="# Your content here in Markdown..."
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : isEdit ? 'Update Post' : 'Create Post'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
