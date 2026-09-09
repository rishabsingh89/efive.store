import React from 'react';
import GenericPage from './GenericPage';
import { servicesData } from '../../data/footerPagesData';

export default function ServicePage() {
  return <GenericPage dataMap={servicesData} basePath="services" categoryName="Services" />;
}
