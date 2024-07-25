import { useState, useEffect } from 'react';
import { db } from '../firebase'; // Assuming you've configured Firebase Firestore
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/authContext';
import Signup from './signup';
import Login from './login';

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
    </div>
  );
};

export default Home;
