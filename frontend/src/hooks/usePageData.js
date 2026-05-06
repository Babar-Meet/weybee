import { useState, useEffect } from 'react';
import axios from 'axios';
import { useEdit } from '../context/EditContext';
import staticContent from '../data/staticContent';

export function usePageData(pageSlug) {
  const { pageData, setPageData } = useEdit();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use static content immediately — zero network calls for public visitors
    const staticPage = staticContent[pageSlug];
    if (staticPage) {
      setPageData(staticPage);
      setLoading(false);
    }

    // If user is logged in as dev/admin, also fetch latest from DB in background
    // so they can see any recent edits that haven't been rebuilt yet
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`/api/content/${pageSlug}`)
        .then(res => {
          if (res.data) {
            setPageData(res.data);
          }
        })
        .catch(() => {
          // API failed — static data is already loaded, no problem
        });
    }

    return () => setPageData(null); // Cleanup on unmount
  }, [pageSlug, setPageData]);

  const getSection = (sectionId) => {
    return pageData?.sections?.find(s => s.sectionId === sectionId) || null;
  };

  return { pageData, loading, getSection };
}
