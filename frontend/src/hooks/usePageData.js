import { useState, useEffect } from 'react';
import { useEdit } from '../context/EditContext';
import staticContent from '../data/staticContent';

export function usePageData(pageSlug) {
  const { pageData, setPageData } = useEdit();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pure static — no API calls, instant render
    const staticPage = staticContent[pageSlug];
    if (staticPage) {
      setPageData(staticPage);
    }
    setLoading(false);

    return () => setPageData(null);
  }, [pageSlug, setPageData]);

  const getSection = (sectionId) => {
    return pageData?.sections?.find(s => s.sectionId === sectionId) || null;
  };

  return { pageData, loading, getSection };
}
