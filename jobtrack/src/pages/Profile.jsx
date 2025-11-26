import { useAuth } from '../App';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>My Profile</h2>
      <img src={user?.photoURL || 'https://i.pravatar.cc/100'} alt="Profile" width="100" style={{ borderRadius: '50%' }} />
      <h3>{user?.displayName || 'No Name'}</h3>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>User ID:</strong> {user?.uid}</p>
      <Link to="/update-profile">
        <button style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>Update Profile</button>
      </Link>
    </div>
  );
}