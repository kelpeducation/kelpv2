import { useEffect, useState } from 'react';
import { defaultPagesContent, loadLivePagesContent, PagesContent } from '@/lib/cms/pageContent';

export const useCmsPagesContent = () => {
  const [pagesContent, setPagesContent] = useState<PagesContent>(defaultPagesContent);

  useEffect(() => {
    loadLivePagesContent().then(setPagesContent);
  }, []);

  return pagesContent;
};
