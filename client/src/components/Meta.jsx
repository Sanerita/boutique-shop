'use client';

import { useEffect } from 'react';

const Meta = ({ title, description, keywords }) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    const updateMetaTag = (name, content) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    if (description) updateMetaTag('description', description);
    if (keywords) updateMetaTag('keywords', keywords);

    return () => {
      // Cleanup if needed
    };
  }, [title, description, keywords]);

  return null;
};

Meta.defaultProps = {
  title: 'Welcome to Boutique Shop',
  description: 'We sell the best products for cheap',
  keywords: 'electronics, buy electronics, cheap electronics',
};

export default Meta;