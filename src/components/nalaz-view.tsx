// src/pages/UserLabReports.tsx
import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase.config';
import Sidebar from '../components/Sidebar';

interface LabReport {
  id: string;
  datum: string;
  laboratorij: string;
  leukociti: string;
  eritrociti: string;
  hemoglobin: string;
  secar: string;
  napomena: string;
}

const UserLabReports: React.FC = () => {
  const [reports, setReports] = useState<LabReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      const user = auth.currentUser;
      if (!user) {
        console.warn("Nema prijavljenog korisnika.");
        setLoading(false);
        return;
      }

      try {
        const q = query(collection(db, 'labReports'), where('korisnikId', '==', user.uid));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as LabReport[];
          setReports(data);
        } else {
          console.log("Nema nalaza za korisnika.");
        }
      } catch (error) {
        console.error("Greška pri dohvatu nalaza:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64 p-6">
        <h2 className="text-2xl font-bold mb-4">Moji laboratorijski nalazi</h2>
        {loading ? (
          <p>Učitavanje...</p>
        ) : reports.length > 0 ? (
          <ul className="space-y-4">
            {reports.map((r) => (
              <li key={r.id} className="bg-white p-4 rounded shadow">
                <p><strong>Datum:</strong> {r.datum}</p>
                <p><strong>Laboratorij:</strong> {r.laboratorij}</p>
                <p><strong>Leukociti:</strong> {r.leukociti}</p>
                <p><strong>Eritrociti:</strong> {r.eritrociti}</p>
                <p><strong>Hemoglobin:</strong> {r.hemoglobin}</p>
                <p><strong>Šećer:</strong> {r.secar}</p>
                <p><strong>Napomena:</strong> {r.napomena}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nemate unesenih laboratorijskih nalaza.</p>
        )}
      </div>
    </div>
  );
};

export default UserLabReports;
