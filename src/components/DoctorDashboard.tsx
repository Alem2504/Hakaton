import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  ime?: string;
  height?: number;
  weight?: number;
  profileCompleted?: boolean;
}

const DoctorDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, 'users'));
    const data: User[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
console.log('FIRESTORE USERS:', data); // 👈 vidi šta stiže
setUsers(data);


      setLoading(false);
    };

    fetchUsers();
  }, []);

  const calculateBMI = (height?: number, weight?: number): string => {
    if (!height || !weight) return 'N/A';
    const heightM = height / 100;
    return (weight / (heightM * heightM)).toFixed(1);
  };

  if (loading) {
    return <div className="flex min-h-screen"><Sidebar /><div className="ml-64 p-6">Učitavanje pacijenata...</div></div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64 p-6">
        <h2 className="text-2xl font-bold mb-4">Pacijenti</h2>
        <div className="overflow-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2 border">Ime</th>
                <th className="text-left px-4 py-2 border">Visina</th>
                <th className="text-left px-4 py-2 border">Težina</th>
                <th className="text-left px-4 py-2 border">BMI</th>
                <th className="text-left px-4 py-2 border">Status</th>
                <th className="text-left px-4 py-2 border">Akcija</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-t">
                  <td className="px-4 py-2 border">{user.ime || 'Nepoznato'}</td>
                  <td className="px-4 py-2 border">{user.height || '-'}</td>
                  <td className="px-4 py-2 border">{user.weight || '-'}</td>
                  <td className="px-4 py-2 border">{calculateBMI(user.height, user.weight)}</td>
                  <td className="px-4 py-2 border">{user.profileCompleted ? '✔️' : '❌'}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => navigate(`/profile-view/${user.id}`)}
                      className="px-3 py-1 bg-blue-600 text-white rounded"
                    >
                      Detalji
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
