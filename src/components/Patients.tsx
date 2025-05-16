// src/pages/Patients.tsx
import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/NavbarD';

interface UserData {
  id: string;
  ime?: string;
  height?: number;
  weight?: number;
  gender?: string;
  birthDate?: string;
}

const Patients: React.FC = () => {
  const [patients, setPatients] = useState<UserData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      const snapshot = await getDocs(collection(db, 'users'));
      const list: UserData[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UserData));
      setPatients(list);
    };
    fetchPatients();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 flex-col">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Lista pacijenata</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map((p) => (
            <div key={p.id} className="bg-white p-4 rounded shadow space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">{p.ime || 'Nepoznato ime'}</h3>
              <p className="text-gray-600 text-sm">Visina: {p.height ?? '-'} cm</p>
              <p className="text-gray-600 text-sm">Težina: {p.weight ?? '-'} kg</p>
              <p className="text-gray-600 text-sm">Spol: {p.gender ?? '-'}</p>
              <p className="text-gray-600 text-sm">Datum rođenja: {p.birthDate ?? '-'}</p>
              <div className="flex gap-2 flex-wrap pt-2">
                <button
                  onClick={() => navigate(`/profile-view/${p.id}`)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                >
                  Profil
                </button>
                <button
                  onClick={() => navigate(`/nalaz/${p.id}`)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                >
                  Dodaj nalaz
                </button>
                <button
                  onClick={() => navigate(`/form-therapy/${p.id}`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                >
                  Dodaj terapiju
                </button>
                <button
                  onClick={() => navigate(`/form-diagnosis/${p.id}`)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Dodaj dijagnozu
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Patients;
