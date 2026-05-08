import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || '/api';
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function AdminDashboard() {
  const { user, isAdmin, isManager, isDeveloper, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [visitorStats, setVisitorStats] = useState(null);
  const [knowledge, setKnowledge] = useState([]);
  const [newKnowledge, setNewKnowledge] = useState({ question: '', answer: '', isVerified: true });
  const [editingKnowledge, setEditingKnowledge] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'user' });
  const [msg, setMsg] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);

  useEffect(() => {
    if (!user || (!isAdmin && !isManager && !isDeveloper)) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [user, tab]);

  const fetchData = async () => {
    try {
      if (tab === 'overview' && (isAdmin || isManager)) {
        const res = await axios.get(`${API}/admin/stats`);
        setStats(res.data);
      }
      if (tab === 'users' && (isAdmin || isManager)) {
        const res = await axios.get(`${API}/admin/users`);
        setUsers(res.data);
      }
      if (tab === 'activity') {
        const res = await axios.get(`${API}/admin/activity?limit=100`);
        setLogs(res.data);
      }
      if (tab === 'contacts' && (isAdmin || isManager)) {
        const res = await axios.get(`${API}/admin/contacts`);
        setContacts(res.data);
      }
      if (tab === 'visitors' && (isAdmin || isManager)) {
        const res = await axios.get(`${API}/track/stats`);
        setVisitorStats(res.data);
      }
      if (tab === 'knowledge' && (isAdmin || isManager)) {
        const res = await axios.get(`${API}/admin/knowledge`);
        setKnowledge(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const createKnowledge = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/admin/knowledge`, newKnowledge);
      setMsg('Knowledge added successfully!');
      setNewKnowledge({ question: '', answer: '', isVerified: true });
      fetchData();
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      setMsg(err.response?.data?.error || 'Failed to add knowledge.');
    }
  };

  const deleteKnowledge = async (id) => {
    if (!window.confirm('Delete this knowledge item?')) return;
    try {
      await axios.delete(`${API}/admin/knowledge/${id}`);
      fetchData();
    } catch (err) { console.error(err); }
  };

  const updateKnowledge = async (id) => {
    try {
      await axios.put(`${API}/admin/knowledge/${id}`, {
        question: editingKnowledge.question,
        answer: editingKnowledge.answer,
        isVerified: editingKnowledge.isVerified
      });
      setEditingKnowledge(null);
      setMsg('Knowledge updated successfully!');
      fetchData();
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      setMsg(err.response?.data?.error || 'Failed to update knowledge.');
    }
  };

  const createUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/admin/users`, newUser);
      setMsg('User created successfully!');
      setNewUser({ name: '', email: '', password: '', role: 'user' });
      fetchData();
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      setMsg(err.response?.data?.error || 'Failed to create user.');
    }
  };

  const toggleActive = async (id, currentStatus) => {
    try {
      await axios.put(`${API}/admin/users/${id}`, { isActive: !currentStatus });
      fetchData();
    } catch (err) { console.error(err); }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await axios.delete(`${API}/admin/users/${id}`);
      fetchData();
    } catch (err) { console.error(err); }
  };

  const tabStyle = (t) => ({
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '14px',
    cursor: 'pointer',
    border: 'none',
    background: tab === t ? 'var(--primary-color)' : '#f0f0f0',
    color: tab === t ? '#fff' : '#555',
    transition: 'all 0.3s'
  });

  const cardStyle = {
    background: '#fff',
    borderRadius: '15px',
    padding: '25px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
    textAlign: 'center'
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6fa', paddingTop: '100px' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '5px' }}>Dashboard</h1>
            <p style={{ color: '#888' }}>Welcome back, <strong>{user?.name}</strong> ({user?.role})</p>
          </div>
          <button onClick={() => { logout(); navigate('/'); }} style={{ padding: '10px 25px', borderRadius: '8px', background: '#ef4444', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
          {(isAdmin || isManager) && <button style={tabStyle('overview')} onClick={() => setTab('overview')}>Overview</button>}
          {(isAdmin || isManager) && <button style={tabStyle('knowledge')} onClick={() => setTab('knowledge')}>Knowledge Base</button>}
          {(isAdmin || isManager) && <button style={tabStyle('users')} onClick={() => setTab('users')}>Users</button>}
          <button style={tabStyle('activity')} onClick={() => setTab('activity')}>Activity Log</button>
          {(isAdmin || isManager) && <button style={tabStyle('contacts')} onClick={() => setTab('contacts')}>Contacts</button>}
          {(isAdmin || isManager) && <button style={tabStyle('visitors')} onClick={() => setTab('visitors')}>Visitors</button>}
          {isAdmin && <button style={tabStyle('create')} onClick={() => setTab('create')}>Create User</button>}
        </div>

        {/* Overview Tab */}
        {tab === 'overview' && stats && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
              {[
                { label: 'Total Users', value: stats.totalUsers, color: '#5670FB' },
                { label: 'Active Users', value: stats.activeUsers, color: '#22c55e' },
                { label: 'Total Logins', value: stats.totalLogins, color: '#f59e0b' },
                { label: 'Page Visits', value: stats.totalPageVisits, color: '#8b5cf6' },
                { label: 'Contact Forms', value: stats.totalContacts, color: '#ec4899' },
                { label: 'New Contacts', value: stats.newContacts, color: '#ef4444' },
                { label: 'Logins (24h)', value: stats.recentLogins, color: '#06b6d4' }
              ].map((s, i) => (
                <div key={i} style={cardStyle}>
                  <h3 style={{ fontSize: '2rem', color: s.color, marginBottom: '5px' }}>{s.value}</h3>
                  <p style={{ color: '#888', fontSize: '0.9rem' }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Users by role */}
            <div style={{ ...cardStyle, textAlign: 'left', marginBottom: '30px' }}>
              <h3 style={{ marginBottom: '15px' }}>Users by Role</h3>
              <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
                {stats.usersByRole?.map((r, i) => (
                  <div key={i}>
                    <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>{r._id}</span>: {r.count}
                  </div>
                ))}
              </div>
            </div>

            {/* Top pages */}
            <div style={{ ...cardStyle, textAlign: 'left' }}>
              <h3 style={{ marginBottom: '15px' }}>Top Visited Pages</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr style={{ borderBottom: '2px solid #f0f0f0' }}>
                  <th style={{ textAlign: 'left', padding: '10px' }}>Page</th>
                  <th style={{ textAlign: 'right', padding: '10px' }}>Visits</th>
                </tr></thead>
                <tbody>
                  {stats.topPages?.map((p, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f8f8f8' }}>
                      <td style={{ padding: '10px' }}>{p._id}</td>
                      <td style={{ padding: '10px', textAlign: 'right', fontWeight: 600 }}>{p.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Knowledge Tab */}
        {tab === 'knowledge' && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp} style={{ background: '#fff', padding: '20px', borderRadius: '15px' }}>
            <h2>Knowledge Base</h2>
            <form onSubmit={createKnowledge} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <input 
                type="text" placeholder="Question / Concept" value={newKnowledge.question}
                onChange={e => setNewKnowledge({ ...newKnowledge, question: e.target.value })}
                required style={{ padding: '10px', width: '30%', borderRadius: '8px', border: '1px solid #ddd' }} 
              />
              <input 
                type="text" placeholder="Answer / Details" value={newKnowledge.answer}
                onChange={e => setNewKnowledge({ ...newKnowledge, answer: e.target.value })}
                required style={{ padding: '10px', width: '50%', borderRadius: '8px', border: '1px solid #ddd' }} 
              />
              <button style={{ padding: '10px 20px', background: 'var(--primary-color)', color: '#fff', borderRadius: '8px', border: 'none' }}>Add</button>
            </form>
            {msg && <p style={{ color: 'green' }}>{msg}</p>}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
              <thead>
                <tr style={{ background: '#f8f9fa', textAlign: 'left' }}>
                  <th style={{ padding: '12px', borderBottom: '2px solid #eee' }}>Question</th>
                  <th style={{ padding: '12px', borderBottom: '2px solid #eee' }}>Answer</th>
                  <th style={{ padding: '12px', borderBottom: '2px solid #eee' }}>Source</th>
                  <th style={{ padding: '12px', borderBottom: '2px solid #eee' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {knowledge.map(k => (
                  <tr key={k._id} style={{ borderBottom: '1px solid #eee' }}>
                    {editingKnowledge?._id === k._id ? (
                      <>
                        <td style={{ padding: '12px' }}>
                          <input type="text" value={editingKnowledge.question} onChange={e => setEditingKnowledge({...editingKnowledge, question: e.target.value})} style={{ width: '100%', padding: '5px' }} />
                        </td>
                        <td style={{ padding: '12px' }}>
                          <textarea value={editingKnowledge.answer} onChange={e => setEditingKnowledge({...editingKnowledge, answer: e.target.value})} style={{ width: '100%', padding: '5px', minHeight: '80px' }}></textarea>
                          <div>
                            <label><input type="checkbox" checked={editingKnowledge.isVerified} onChange={e => setEditingKnowledge({...editingKnowledge, isVerified: e.target.checked})} /> Verified (Mark true to make valid)</label>
                          </div>
                        </td>
                        <td style={{ padding: '12px' }}>{k.source}</td>
                        <td style={{ padding: '12px' }}>
                          <button onClick={() => updateKnowledge(k._id)} style={{ color: 'green', border: 'none', background: 'none', cursor: 'pointer', marginRight: '10px' }}>Save</button>
                          <button onClick={() => setEditingKnowledge(null)} style={{ color: 'gray', border: 'none', background: 'none', cursor: 'pointer' }}>Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={{ padding: '12px' }}>{k.question}</td>
                        <td style={{ padding: '12px', maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={k.answer}>{k.answer}</td>
                        <td style={{ padding: '12px' }}>
                           <span style={{ padding: '4px 8px', borderRadius: '20px', background: k.isVerified ? '#dcfce7' : '#fef9c3', color: k.isVerified ? '#166534' : '#854d0e', fontSize: '0.8rem' }}>
                             {k.source}
                           </span>
                        </td>
                        <td style={{ padding: '12px' }}>
                          {!k.readOnly && (
                            <>
                              <button onClick={() => setEditingKnowledge(k)} style={{ color: 'blue', border: 'none', background: 'none', cursor: 'pointer', marginRight: '10px' }}>Edit</button>
                              <button onClick={() => deleteKnowledge(k._id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Delete</button>
                            </>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Users Tab */}
        {tab === 'users' && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div style={{ ...cardStyle, textAlign: 'left', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr style={{ borderBottom: '2px solid #f0f0f0' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Role</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Last Login</th>
                  {isAdmin && <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>}
                </tr></thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u._id} style={{ borderBottom: '1px solid #f8f8f8' }}>
                      <td style={{ padding: '12px' }}>{u.name}</td>
                      <td style={{ padding: '12px', color: '#666' }}>{u.email}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, background: u.role === 'admin' ? '#fef3c7' : u.role === 'manager' ? '#dbeafe' : u.role === 'developer' ? '#f3e8ff' : '#f0fdf4', color: u.role === 'admin' ? '#92400e' : u.role === 'manager' ? '#1e40af' : u.role === 'developer' ? '#6b21a8' : '#166534' }}>
                          {u.role}
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ color: u.isActive ? '#22c55e' : '#ef4444', fontWeight: 600 }}>{u.isActive ? 'Active' : 'Inactive'}</span>
                      </td>
                      <td style={{ padding: '12px', color: '#888', fontSize: '0.85rem' }}>
                        {u.lastLogin ? new Date(u.lastLogin).toLocaleString() : 'Never'}
                      </td>
                      {isAdmin && (
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          <button onClick={() => toggleActive(u._id, u.isActive)} style={{ padding: '5px 12px', borderRadius: '5px', border: 'none', cursor: 'pointer', marginRight: '5px', background: u.isActive ? '#fee2e2' : '#dcfce7', color: u.isActive ? '#ef4444' : '#22c55e', fontWeight: 500 }}>
                            {u.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                          <button onClick={() => deleteUser(u._id)} style={{ padding: '5px 12px', borderRadius: '5px', border: 'none', cursor: 'pointer', background: '#fee2e2', color: '#ef4444', fontWeight: 500 }}>
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Activity Log Tab */}
        {tab === 'activity' && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div style={{ ...cardStyle, textAlign: 'left', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr style={{ borderBottom: '2px solid #f0f0f0' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>User</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Action</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Details</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Time</th>
                </tr></thead>
                <tbody>
                  {logs.map((log, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f8f8f8' }}>
                      <td style={{ padding: '12px' }}>{log.userId?.name || 'Unknown'}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, background: log.action === 'login' ? '#dcfce7' : log.action === 'logout' ? '#fee2e2' : log.action === 'page_visit' ? '#dbeafe' : '#f3e8ff', color: log.action === 'login' ? '#166534' : log.action === 'logout' ? '#991b1b' : log.action === 'page_visit' ? '#1e40af' : '#6b21a8' }}>
                          {log.action}
                        </span>
                      </td>
                      <td style={{ padding: '12px', color: '#666' }}>
                        {log.details}
                        {log.metadata && (
                          <button onClick={() => setSelectedLog(log)} style={{ marginLeft: '10px', padding: '4px 10px', fontSize: '12px', borderRadius: '5px', border: '1px solid #5670FB', background: 'transparent', color: '#5670FB', cursor: 'pointer' }}>
                            More Details
                          </button>
                        )}
                      </td>
                      <td style={{ padding: '12px', color: '#888', fontSize: '0.85rem' }}>{new Date(log.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Contacts Tab */}
        {tab === 'contacts' && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div style={{ ...cardStyle, textAlign: 'left', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr style={{ borderBottom: '2px solid #f0f0f0' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Subject</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Message</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Date</th>
                </tr></thead>
                <tbody>
                  {contacts.map((c, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f8f8f8' }}>
                      <td style={{ padding: '12px' }}>{c.name}</td>
                      <td style={{ padding: '12px', color: '#5670FB' }}>{c.email}</td>
                      <td style={{ padding: '12px' }}>{c.subject || '-'}</td>
                      <td style={{ padding: '12px', color: '#666', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.message}</td>
                      <td style={{ padding: '12px', color: '#888', fontSize: '0.85rem' }}>{new Date(c.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Create User Tab */}
        {tab === 'create' && isAdmin && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div style={{ ...cardStyle, textAlign: 'left', maxWidth: '600px' }}>
              <h3 style={{ marginBottom: '20px' }}>Create Custom User</h3>
              <form onSubmit={createUser} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="text" placeholder="Full Name" required
                  value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})}
                  style={{ padding: '14px 18px', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '14px', outline: 'none' }}
                />
                <input type="email" placeholder="Email Address" required
                  value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})}
                  style={{ padding: '14px 18px', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '14px', outline: 'none' }}
                />
                <input type="password" placeholder="Password" required minLength={6}
                  value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})}
                  style={{ padding: '14px 18px', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '14px', outline: 'none' }}
                />
                <select value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})}
                  style={{ padding: '14px 18px', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '14px', backgroundColor: '#fff' }}
                >
                  <option value="user">User</option>
                  <option value="developer">Developer</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
                <button type="submit" style={{ padding: '14px', borderRadius: '8px', background: 'var(--primary-color)', color: '#fff', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                  Create User
                </button>
                {msg && <p style={{ color: msg.includes('success') ? '#22c55e' : '#ef4444', fontWeight: 500 }}>{msg}</p>}
              </form>
            </div>
          </motion.div>
        )}
        {/* Visitors Tab */}
        {tab === 'visitors' && visitorStats && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              {[
                { label: 'Total Page Views', value: visitorStats.totalVisits, color: '#5670FB' },
                { label: 'Views (24h)', value: visitorStats.visits24h, color: '#22c55e' },
                { label: 'Views (7d)', value: visitorStats.visits7d, color: '#f59e0b' },
                { label: 'Unique Sessions', value: visitorStats.uniqueSessions, color: '#8b5cf6' },
                { label: 'Unique IPs', value: visitorStats.uniqueIPs, color: '#ec4899' }
              ].map((s, i) => (
                <div key={i} style={cardStyle}>
                  <h3 style={{ fontSize: '2rem', color: s.color, marginBottom: '5px' }}>{s.value}</h3>
                  <p style={{ color: '#888', fontSize: '0.9rem' }}>{s.label}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
              <div style={{ ...cardStyle, textAlign: 'left' }}>
                <h3 style={{ marginBottom: '15px' }}>Top Pages (All Visitors)</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {visitorStats.topPages?.map((p, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #f8f8f8' }}>
                        <td style={{ padding: '8px' }}>{p._id}</td>
                        <td style={{ padding: '8px', textAlign: 'right', fontWeight: 600, color: '#5670FB' }}>{p.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ ...cardStyle, textAlign: 'left' }}>
                <h3 style={{ marginBottom: '15px' }}>Platforms</h3>
                {visitorStats.platforms?.map((p, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f8f8f8' }}>
                    <span>{p._id || 'Unknown'}</span>
                    <span style={{ fontWeight: 600 }}>{p.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ ...cardStyle, textAlign: 'left' }}>
              <h3 style={{ marginBottom: '15px' }}>Recent Visitors</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr style={{ borderBottom: '2px solid #f0f0f0' }}>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Session</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>User</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>IP</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Location</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Page</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Platform</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Time</th>
                </tr></thead>
                <tbody>
                  {visitorStats.recentVisitors?.map((v, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f8f8f8' }}>
                      <td style={{ padding: '10px', fontSize: '0.8rem', color: '#888' }}>{v.sessionId?.slice(0, 12)}...</td>
                      <td style={{ padding: '10px' }}>{v.userId?.name || <span style={{ color: '#f59e0b' }}>Anonymous</span>}</td>
                      <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '0.85rem' }}>{v.ipAddress}</td>
                      <td style={{ padding: '10px', fontSize: '0.85rem', color: '#444' }}>
                        {v.location ? `${v.location.city || ''}, ${v.location.country || ''}`.replace(/^,\s*|,\s*$/g, '') : '-'}
                      </td>
                      <td style={{ padding: '10px' }}>{v.page}</td>
                      <td style={{ padding: '10px', color: '#666' }}>{v.platform || '-'}</td>
                      <td style={{ padding: '10px', color: '#888', fontSize: '0.85rem' }}>{new Date(v.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

      </div>
      <div style={{ height: '60px' }}></div>

      {/* Log Details Modal */}
      {selectedLog && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: '#fff', borderRadius: '15px', padding: '30px', width: '90%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.5rem' }}>Activity Details</h2>
              <button onClick={() => setSelectedLog(null)} style={{ border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
            </div>
            <div style={{ marginBottom: '15px', padding: '15px', background: '#f4f6fa', borderRadius: '10px' }}>
              <p><strong>Action:</strong> {selectedLog.action}</p>
              <p><strong>Details:</strong> {selectedLog.details}</p>
              <p><strong>IP:</strong> {selectedLog.ipAddress}</p>
              <p><strong>Time:</strong> {new Date(selectedLog.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <h3 style={{ marginBottom: '10px' }}>Metadata / Data Changes</h3>
              <pre style={{ background: '#282c34', color: '#abb2bf', padding: '15px', borderRadius: '10px', overflowX: 'auto', fontSize: '13px', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                {JSON.stringify(selectedLog.metadata, null, 2)}
              </pre>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
