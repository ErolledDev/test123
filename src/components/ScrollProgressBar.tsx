// src/components/ScrollProgressBar.tsx
'use client';

import React, { useEffect, useState } from 'react';

const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentScroll = window.scrollY;
      const scrollPercentage = (currentScroll / totalScroll) * 100;
      setScrollProgress(scrollPercentage);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="h-1 bg-blue-600 transition-all duration-300 fixed top-0 left-0 z-50"
      style={{ width: `${scrollProgress}%` }}
    ></div>
  );
};

export default ScrollProgressBar;
