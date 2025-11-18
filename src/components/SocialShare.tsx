// src/components/SocialShare.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { IconType } from 'react-icons';

interface SocialShareProps {
  title: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ title }) => {
  const [currentUrl, setCurrentUrl] = useState<string>('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const socialPlatforms: {
    name: string;
    icon: IconType;
    getShareUrl: (url: string, title: string) => string;
  }[] = [
    {
      name: 'twitter',
      icon: FaTwitter,
      getShareUrl: (url: string, title: string) =>
        `https://twitter.com/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      name: 'facebook',
      icon: FaFacebook,
      getShareUrl: (url: string) =>
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: 'linkedin',
      icon: FaLinkedin,
      getShareUrl: (url: string, title: string) =>
        `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    },
  ];

  return (
    <div className="flex space-x-4 mb-8">
      {socialPlatforms.map(({ name, icon: Icon, getShareUrl }) => (
        <a
          key={name}
          href={getShareUrl(currentUrl, title)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Icon size={24} />
        </a>
      ))}
    </div>
  );
};

export default SocialShare;