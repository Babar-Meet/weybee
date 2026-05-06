import { useState, useEffect } from 'react';
import axios from 'axios';
import { useEdit } from '../context/EditContext';

const cache = {}; // Global in-memory cache

export function usePageData(pageSlug) {
  const { pageData, setPageData } = useEdit();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setLoading(true);
        // Check cache first
        if (cache[pageSlug]) {
          setPageData(cache[pageSlug]);
          setLoading(false);
          // Fetch in background to update cache without blocking UI
          axios.get(`/api/content/${pageSlug}`).then(res => {
            cache[pageSlug] = res.data;
            setPageData(res.data);
          }).catch(() => {});
          return;
        }

        const res = await axios.get(`/api/content/${pageSlug}`);
        cache[pageSlug] = res.data;
        setPageData(res.data);
      } catch (err) {
        console.error('Failed to load page content', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();

    return () => setPageData(null); // Cleanup on unmount
  }, [pageSlug, setPageData]);

  const getSection = (sectionId) => {
    return pageData?.sections?.find(s => s.sectionId === sectionId) || null;
  };

  return { pageData, loading, getSection };
}
