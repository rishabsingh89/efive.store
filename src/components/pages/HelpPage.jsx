import React from 'react';
import GenericPage from './GenericPage';
import { helpData } from '../../data/footerPagesData';

export default function HelpPage() {
  return <GenericPage dataMap={helpData} basePath="help" categoryName="Help" />;
}
