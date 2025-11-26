import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }} />
        <Link to="/forgot-password" state={{ email }}>Forgot Password?</Link>
        <button type="submit" style={{ width: '100%', padding: '0.5rem', marginTop: '1rem' }}>Login</button>
      </form>
      <button onClick={handleGoogleLogin} style={{ width: '100%', padding: '0.5rem', marginTop: '1rem' }}>Login with Google</button>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}