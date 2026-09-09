import React from 'react';
import GenericPage from './GenericPage';
import { aboutData } from '../../data/footerPagesData';

export default function AboutPage() {
  return <GenericPage dataMap={aboutData} basePath="about" categoryName="About EFIVE" />;
}
