# CMS Usage Guide

## Admin Login

Your blog now has a built-in CMS that allows you to create, edit, and delete posts directly from your browser.

### Accessing the CMS

1. Visit your homepage at `/`
2. Click the "Admin Login" button in the top-right corner or the "Admin CMS" button in the CTA section
3. Enter the admin password: `admin123`
4. You'll be redirected to the admin dashboard

### Admin Dashboard

Once logged in, you'll see:
- A list of all your blog posts
- Options to create, edit, or delete posts
- Quick access back to the public blog

### Creating a New Post

1. Click the "New Post" button
2. Fill in all the required fields:
   - **Slug**: URL-friendly name (e.g., `my-first-post`)
   - **Title**: The post title
   - **Date**: Publication date
   - **Excerpt**: Brief description
   - **Category**: Post category
   - **Tags**: Comma-separated tags (optional)
   - **Cover Image URL**: URL to the cover image (optional)
   - **Author Name**: Your name (optional)
   - **Author Image URL**: URL to your avatar (optional)
   - **Author Bio**: Brief bio (optional)
   - **Content**: The post content in Markdown format

3. Click "Create Post"
4. The post will be saved directly to your GitHub repository

### Editing a Post

1. From the admin dashboard, click the edit icon next to any post
2. Modify the fields as needed
3. Click "Update Post"
4. Changes will be pushed to GitHub

### Deleting a Post

1. From the admin dashboard, click the delete icon next to any post
2. Confirm the deletion
3. The post will be removed from your GitHub repository

## How It Works

The CMS integrates directly with your GitHub repository:
- When you create a post, it creates a new Markdown file in your repository
- When you edit a post, it updates the existing file
- When you delete a post, it removes the file from your repository

All changes are committed to GitHub automatically with descriptive commit messages.

## Security

The CMS uses password authentication stored in your environment variables. The password is never exposed to the client side and all API operations require proper authentication.

## Environment Variables

Make sure these are set in your `.env` file:
- `GITHUB_REPO`: Your GitHub repository (e.g., `username/repo`)
- `GITHUB_TOKEN`: Your GitHub personal access token
- `ADMIN_PASSWORD`: Password for API authentication
- `NEXT_PUBLIC_ADMIN_PASSWORD`: Password for client-side validation

## Tips

- Use descriptive slugs for better SEO
- Add cover images to make your posts more engaging
- Use Markdown formatting for rich content
- Preview your posts by visiting the blog after publishing
