import { useEdit } from '../context/EditContext';

export default function EditableSection({ pageSlug, sectionId, children }) {
  const { editMode, canEdit, setEditingSection, pageData } = useEdit();

  if (!canEdit || !editMode) return <>{children}</>;

  const handleEdit = () => {
    if (!pageData) return;
    const section = pageData.sections.find(s => s.sectionId === sectionId);
    if (section) {
      setEditingSection({ pageSlug, section });
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div 
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          border: '2px dashed #ef4444', background: 'rgba(239, 68, 68, 0.05)',
          zIndex: 100, pointerEvents: 'none'
        }}
      />
      <button
        onClick={handleEdit}
        style={{
          position: 'absolute', top: '10px', right: '10px', zIndex: 101,
          background: '#ef4444', color: '#fff', border: 'none', borderRadius: '5px',
          padding: '8px 15px', fontWeight: 'bold', cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
        }}
      >
        ✏️ Edit
      </button>
      {children}
    </div>
  );
}
