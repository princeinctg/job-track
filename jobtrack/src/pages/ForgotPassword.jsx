/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';  // useEffect এখানে অ্যাড করুন
import { useLocation, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase.js';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.email) setEmail(location.state.email);
  }, [location]);

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent! Redirecting to Gmail...');
      setTimeout(() => {
        window.open('https://mail.google.com', '_blank');
        navigate('/login');
      }, 2000);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Reset Password</h2>
      <form onSubmit={handleReset}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
          style={{ width: '100%', padding: '0.5rem' }} 
        />
        <button type="submit" style={{ width: '100%', padding: '0.5rem', marginTop: '1rem' }}>
          Reset Password
        </button>
      </form>
    </div>
  );
}