// src/app/page.tsx
'use client';

import Link from 'next/link';
import { 
  FaGithub, 
  FaMarkdown, 
  FaMobile, 
  FaBolt, 
  FaSearch, 
  FaImage,
  FaCode,
  FaRocket,
  FaPalette,
  FaChartLine
} from 'react-icons/fa';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <div className="text-blue-600 mb-4 text-3xl">{icon}</div>
    <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-50 opacity-90" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative pt-16 pb-20 lg:pt-24 lg:pb-28">
            <div className="text-center lg:text-left">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-gray-900"
              >
                <span className="block">Turn Your GitHub Repo</span>
                <span className="block text-blue-600">Into a Beautiful Blog</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto lg:mx-0"
              >
                A modern, feature-rich blogging platform that transforms your Markdown files into an elegant blog. 
                Built with Next.js 14, Tailwind CSS, and the power of GitHub.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
              >
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  View Demo Blog
                </Link>
                <a
                  href="https://github.com/Dicklesworthstone/nextjs-github-markdown-blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-lg font-medium rounded-xl text-blue-600 bg-white hover:bg-blue-50 transition-colors duration-300"
                >
                  <FaGithub className="mr-2" />
                  View on GitHub
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
              Everything You Need for a Modern Blog
            </h2>
            <p className="text-xl text-gray-600">
              Built with the latest technologies and best practices, our blogging platform 
              provides everything you need to create and maintain a professional blog.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FaGithub />}
              title="GitHub-Powered CMS"
              description="Use GitHub as your content management system. Write posts in Markdown, manage them with Git, and leverage version control."
            />
            <FeatureCard
              icon={<FaRocket />}
              title="Lightning Fast"
              description="Built with Next.js 14 and optimized for performance. Your blog loads instantly and ranks high in Core Web Vitals."
            />
            <FeatureCard
              icon={<FaPalette />}
              title="Beautiful Design"
              description="Professionally designed components and layouts that look great out of the box, powered by Tailwind CSS."
            />
            <FeatureCard
              icon={<FaCode />}
              title="Developer Friendly"
              description="Clean code, TypeScript support, and extensive documentation make it easy to customize and extend."
            />
            <FeatureCard
              icon={<FaChartLine />}
              title="SEO Optimized"
              description="Built-in SEO best practices, meta tags, and structured data to help your content rank better."
            />
            <FeatureCard
              icon={<FaImage />}
              title="Rich Media Support"
              description="Support for images, code snippets, embeds, and more. All optimized for fast loading and great UX."
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-3xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-white mb-8">
            Ready to Start Your Blog?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Transform your GitHub Markdown files into a beautiful, modern blog in minutes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-blue-600 bg-white hover:bg-blue-50 transition-colors duration-300"
            >
              View Demo Blog
            </Link>
            <a
              href="https://github.com/Dicklesworthstone/nextjs-github-markdown-blog/blob/main/README.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-medium rounded-xl text-white hover:bg-blue-500 transition-colors duration-300"
            >
              Read the Docs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}