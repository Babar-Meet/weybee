import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const pageV = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.4 } }, exit: { opacity: 0 } };

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      let user;
      if (isRegister) {
        user = await register(form.name, form.email, form.password);
      } else {
        user = await login(form.email, form.password);
      }
      // Redirect based on role
      if (user.role === 'admin' || user.role === 'manager') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      if (typeof err.response?.data?.error === 'string') {
        setError(err.response.data.error);
      } else if (typeof err.response?.data?.message === 'string') {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
    setLoading(false);
  };

  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageV}
      style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #5670FB 0%, #3a4fd1 100%)', padding: '80px 20px' }}
    >
      <motion.div
        style={{ background: '#fff', borderRadius: '20px', padding: '50px 40px', width: '100%', maxWidth: '450px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Link to="/"><img src="/assets/WeyBee-sticky-logo.png" alt="WeyBee" style={{ height: '40px', marginBottom: '20px' }} /></Link>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
          <p style={{ color: '#888', fontSize: '0.95rem' }}>{isRegister ? 'Sign up to get started' : 'Sign in to your account'}</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {isRegister && (
            <input type="text" placeholder="Full Name" required
              value={form.name} onChange={e => setForm({...form, name: e.target.value})}
              style={{ padding: '14px 18px', borderRadius: '10px', border: '1px solid #e0e0e0', fontSize: '14px', outline: 'none', transition: 'border 0.3s' }}
              onFocus={e => e.target.style.borderColor = '#5670FB'} onBlur={e => e.target.style.borderColor = '#e0e0e0'}
            />
          )}
          <input type="email" placeholder="Email Address" required
            value={form.email} onChange={e => setForm({...form, email: e.target.value})}
            style={{ padding: '14px 18px', borderRadius: '10px', border: '1px solid #e0e0e0', fontSize: '14px', outline: 'none', transition: 'border 0.3s' }}
            onFocus={e => e.target.style.borderColor = '#5670FB'} onBlur={e => e.target.style.borderColor = '#e0e0e0'}
          />
          <input type="password" placeholder="Password" required minLength={6}
            value={form.password} onChange={e => setForm({...form, password: e.target.value})}
            style={{ padding: '14px 18px', borderRadius: '10px', border: '1px solid #e0e0e0', fontSize: '14px', outline: 'none', transition: 'border 0.3s' }}
            onFocus={e => e.target.style.borderColor = '#5670FB'} onBlur={e => e.target.style.borderColor = '#e0e0e0'}
          />

          {error && <p style={{ color: '#ef4444', fontSize: '0.9rem', textAlign: 'center' }}>{error}</p>}

          <button type="submit" disabled={loading}
            style={{ padding: '14px', borderRadius: '10px', background: 'var(--primary-color)', color: '#fff', fontWeight: 600, fontSize: '15px', border: 'none', cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1, transition: 'all 0.3s' }}
          >
            {loading ? 'Please wait...' : (isRegister ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '25px' }}>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <span onClick={() => { setIsRegister(!isRegister); setError(''); }} style={{ color: 'var(--primary-color)', fontWeight: 600, cursor: 'pointer' }}>
              {isRegister ? 'Sign In' : 'Sign Up'}
            </span>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
