import { useState, useEffect } from 'react';
import axios from 'axios';
import { useEdit } from '../context/EditContext';
import staticContent from '../data/staticContent';

export function usePageData(pageSlug) {
  const { pageData, setPageData } = useEdit();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Step 1: Render static content INSTANTLY (no blank screen, no spinner)
    const staticPage = staticContent[pageSlug];
    if (staticPage) {
      setPageData(staticPage);
      setLoading(false);
    }

    // Step 2: ALWAYS fetch latest from API in background (for all users)
    // When dev edits content via CMS, this ensures visitors see it on next load
    axios.get(`/api/content/${pageSlug}`)
      .then(res => {
        if (res.data) {
          setPageData(res.data);  // Seamlessly swap in fresh data
          setLoading(false);      // In case static was missing
        }
      })
      .catch(() => {
        // API failed (cold start, DB down, etc.) — static data already showing
        // No error shown to user, they see the static version
        setLoading(false);
      });

    return () => setPageData(null);
  }, [pageSlug, setPageData]);

  const getSection = (sectionId) => {
    return pageData?.sections?.find(s => s.sectionId === sectionId) || null;
  };

  return { pageData, loading, getSection };
}
