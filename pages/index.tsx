import { useState, useEffect } from 'react';
import { db } from '../firebase'; 
import { collection, getDocs } from 'firebase/firestore';
import router from 'next/router';
import { useAuth } from '../context/authContext';
import Signup from './signup';
import Login from './login';
import AddLink from './add-link';

interface Link {
  id: string;
  title: string;
  url: string;
}

const Home = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchLinks = async () => {
      const linksCollection = collection(db, 'links');
      const linksSnapshot = await getDocs(linksCollection);
      const linksList = linksSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Link[];
      setLinks(linksList);
      // console.log(linksCollection);
    };

    fetchLinks();
  }, []);

  if (!user) {
    return (
      <>
        <Login />
        <Signup />
      </>
    ) ;
  }
  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl mb-4">Your Links</h1>
      <ul>
        {links.map(link => (
          <li key={link.id} className="mb-2">
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
              {link.title}
            </a>
          </li>
        ))}
      </ul>
      <AddLink />
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Log Out
      </button>
    </div>
  );
};

export default Home;
function logout() {
  throw new Error('Function not implemented.');
}

