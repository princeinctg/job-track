import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    document.title = 'Home | JobTrack';
  }, []);

  return (
    <div>
      <h1>Welcome to JobTrack</h1>
      <p>Find your dream job today!</p>
      {/* Add sections here later */}
    </div>
  );
}