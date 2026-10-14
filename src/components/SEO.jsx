import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, path = '', noindex = false }) {
  const baseUrl = 'https://www.efive.store';
  const cleanPath = path === '/' ? '/' : (path.startsWith('/') ? path : `/${path}`);
  const currentUrl = cleanPath === '/' ? `${baseUrl}/` : `${baseUrl}${cleanPath}`;
  const fullTitle = title.toLowerCase().includes('efive') ? title : `${title} | EFIVE STUDIO`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl} />
      {noindex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Efive Studio" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
