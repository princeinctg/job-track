import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './App';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '2px solid #ccc' }}>
      <Link to="/">JobTrack</Link>
      <div>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        {user ? (
          <>
            <Link to="/profile" style={{ marginRight: '1rem' }}>
              <img src={user.photoURL || 'https://i.pravatar.cc/30'} alt="Profile" width="30" style={{ borderRadius: '50%' }} />
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}