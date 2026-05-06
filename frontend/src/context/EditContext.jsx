import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const EditContext = createContext(null);
const API = import.meta.env.VITE_API_URL || '/api';

export function EditProvider({ children }) {
  const { isDeveloper, isManager, isAdmin, token } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [editingSection, setEditingSection] = useState(null); // { pageSlug, section }
  const [pageData, setPageData] = useState(null);

  const canEdit = isDeveloper || isManager || isAdmin;

  const saveSection = async (pageSlug, sectionId, updatedData) => {
    try {
      const res = await axios.put(`${API}/content/${pageSlug}/section/${sectionId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPageData(res.data);
      setEditingSection(null);
      return res.data;
    } catch (err) {
      console.error('Failed to save section', err);
      throw err;
    }
  };

  const addSectionItem = async (pageSlug, sectionId, newItem) => {
    if (!pageData) return;
    const section = pageData.sections.find(s => s.sectionId === sectionId);
    if (!section) return;
    
    const updatedItems = [...section.items, newItem];
    return saveSection(pageSlug, sectionId, { items: updatedItems });
  };

  const removeSectionItem = async (pageSlug, sectionId, itemIndex) => {
    if (!pageData) return;
    const section = pageData.sections.find(s => s.sectionId === sectionId);
    if (!section) return;
    
    const updatedItems = section.items.filter((_, i) => i !== itemIndex);
    return saveSection(pageSlug, sectionId, { items: updatedItems });
  };

  return (
    <EditContext.Provider value={{ 
      editMode, setEditMode, 
      canEdit, 
      editingSection, setEditingSection,
      pageData, setPageData,
      saveSection, addSectionItem, removeSectionItem
    }}>
      {children}
      
      {/* Floating Edit Toggle */}
      {canEdit && (
        <div style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 9999 }}>
          <button 
            onClick={() => setEditMode(!editMode)}
            style={{
              padding: '12px 24px', borderRadius: '30px', border: 'none',
              background: editMode ? '#ef4444' : 'var(--primary-color)',
              color: '#fff', fontWeight: 'bold', cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}
          >
            {editMode ? 'Exit Edit Mode' : '✏️ Edit Page'}
          </button>
        </div>
      )}
    </EditContext.Provider>
  );
}

export function useEdit() {
  return useContext(EditContext);
}
