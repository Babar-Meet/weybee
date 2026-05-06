import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEdit } from '../context/EditContext';

export default function SectionEditorModal() {
  const { editingSection, setEditingSection, saveSection, pageData } = useEdit();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (editingSection) {
      setFormData(JSON.parse(JSON.stringify(editingSection.section)));
    }
  }, [editingSection]);

  if (!editingSection || !formData) return null;

  const handleSave = async () => {
    await saveSection(editingSection.pageSlug, formData.sectionId, formData);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...(formData.items || []), { title: 'New Item', description: '', image: '', icon: '', link: '' }]
    });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
        style={{ background: '#fff', borderRadius: '15px', padding: '30px', width: '90%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.5rem' }}>Edit Section: {formData.sectionId}</h2>
          <button onClick={() => setEditingSection(null)} style={{ border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
          {formData.heading !== undefined && (
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Heading</label>
              <input type="text" value={formData.heading || ''} onChange={e => setFormData({...formData, heading: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
            </div>
          )}
          {formData.subheading !== undefined && (
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Subheading</label>
              <input type="text" value={formData.subheading || ''} onChange={e => setFormData({...formData, subheading: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
            </div>
          )}
          {formData.text !== undefined && (
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Text</label>
              <textarea value={formData.text || ''} onChange={e => setFormData({...formData, text: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', minHeight: '100px' }} />
            </div>
          )}
          {formData.image !== undefined && (
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Image URL</label>
              <input type="text" value={formData.image || ''} onChange={e => setFormData({...formData, image: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
            </div>
          )}
        </div>

        {formData.items && formData.items.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ fontSize: '1.2rem' }}>Items / Cards</h3>
              <button onClick={addItem} style={{ padding: '6px 15px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Item</button>
            </div>
            
            <div style={{ display: 'grid', gap: '20px' }}>
              {formData.items.map((item, i) => (
                <div key={i} style={{ padding: '15px', border: '1px solid #eee', borderRadius: '10px', position: 'relative', background: '#f9f9f9' }}>
                  <button onClick={() => removeItem(i)} style={{ position: 'absolute', top: '10px', right: '10px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer' }}>×</button>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input type="text" placeholder="Title" value={item.title || ''} onChange={e => handleItemChange(i, 'title', e.target.value)} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    <textarea placeholder="Description" value={item.description || ''} onChange={e => handleItemChange(i, 'description', e.target.value)} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input type="text" placeholder="Image URL" value={item.image || ''} onChange={e => handleItemChange(i, 'image', e.target.value)} style={{ flex: 1, padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
                      <input type="text" placeholder="Icon / Emoji" value={item.icon || ''} onChange={e => handleItemChange(i, 'icon', e.target.value)} style={{ width: '120px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
                      <input type="text" placeholder="Link URL" value={item.link || ''} onChange={e => handleItemChange(i, 'link', e.target.value)} style={{ flex: 1, padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button onClick={() => setEditingSection(null)} style={{ padding: '10px 20px', borderRadius: '8px', background: '#f0f0f0', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Cancel</button>
          <button onClick={handleSave} style={{ padding: '10px 30px', borderRadius: '8px', background: 'var(--primary-color)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Save Changes</button>
        </div>
      </motion.div>
    </div>
  );
}
