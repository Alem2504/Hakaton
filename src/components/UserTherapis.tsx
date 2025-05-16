import React, { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase.config';
import Sidebar from '../components/Sidebar';

interface Therapy {
  value: string;
  timestamp: string;
}

const UserTherapies: React.FC = () => {
  const [therapies, setTherapies] = useState<Therapy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTherapies = async () => {
      const user = auth.currentUser;
      if (!user) {
        console.warn("Nema prijavljenog korisnika.");
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, 'therapies', user.uid);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          const data = snapshot.data();
          console.log("Podaci iz baze:", data);

          if (data?.value && data?.timestamp) {
            setTherapies([{ value: data.value, timestamp: data.timestamp }]);
          }
        } else {
          console.log("Terapije nisu pronađene.");
        }
      } catch (error) {
        console.error("Greška:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTherapies();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64 p-6">
        <h2 className="text-2xl font-bold mb-4">Moje terapije</h2>
        {loading ? (
          <p>Učitavanje...</p>
        ) : therapies.length > 0 ? (
          <ul className="space-y-4">
            {therapies.map((therapy, index) => (
              <li key={index} className="bg-white p-4 rounded shadow">
                <p className="text-gray-800 whitespace-pre-wrap">{therapy.value}</p>
                <p className="text-sm text-gray-500 mt-2">{new Date(therapy.timestamp).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nemate evidentiranih terapija.</p>
        )}
      </div>
    </div>
  );
};

export default UserTherapies;
