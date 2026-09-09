import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, path }) {
  const baseUrl = 'https://efive.store'; // Actual domain
  const currentUrl = `${baseUrl}${path}`;
  const fullTitle = `${title} | EFIVE STUDIO`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
