import { useState, useEffect } from 'react';
import axios from 'axios';
import { useEdit } from '../context/EditContext';

export function usePageData(pageSlug) {
  const { pageData, setPageData } = useEdit();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/content/${pageSlug}`);
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
