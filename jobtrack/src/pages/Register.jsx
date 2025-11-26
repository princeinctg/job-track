import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;
    return hasUpperCase && hasLowerCase && isLongEnough;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validatePassword(password)) {
      setError('Password must contain uppercase, lowercase, and be at least 6 characters');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name, photoURL });
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }} />
        <input type="url" placeholder="Photo URL (optional)" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }} />
        <button type="submit" style={{ width: '100%', padding: '0.5rem' }}>Register</button>
      </form>
      <button onClick={handleGoogleLogin} style={{ width: '100%', padding: '0.5rem', marginTop: '1rem' }}>Register with Google</button>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}