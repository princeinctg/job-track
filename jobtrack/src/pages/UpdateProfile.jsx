import { useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function UpdateProfile() {
  const user = auth.currentUser;
  const [name, setName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(user, { displayName: name, photoURL });
      alert('Profile updated successfully!');
      navigate('/profile');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Update Profile</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
        <input type="url" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} placeholder="Photo URL" style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
        <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.5rem' }}>
          {loading ? 'Updating...' : 'Update Information'}
        </button>
      </form>
    </div>
  );
}