// src/pages/EditHealthForm.tsx
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase.config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';

interface UserData {
  height: number;
  weight: number;
  mealsDaily: string;
  exercise: string;
  liquidIntake: string;
  profileCompleted: boolean;
  gender: string; // 'male' | 'female'
  birthDate: string; // 'YYYY-MM-DD'
}

const EditHealthForm: React.FC = () => {
  const [formData, setFormData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        setFormData(userDocSnap.data() as UserData);
      } else {
        // Ako nema podataka, inicijalizuj prazne
        setFormData({
          height: 0,
          weight: 0,
          mealsDaily: '2',
          exercise: '1',
          liquidIntake: '2',
          profileCompleted: false,
          gender: '',
          birthDate: '',
        });
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || !formData) return;

    await setDoc(doc(db, 'users', user.uid), {
      ...formData,
      profileCompleted: true,
    }, { merge: true });

    alert('Podaci su uspješno ažurirani!');
  };

  if (loading) return <p className="p-6">Učitavanje podataka...</p>;
  if (!formData) return <p className="p-6">Nema podataka za prikaz.</p>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64 p-6">
        <div className="max-w-xl mx-auto bg-white shadow p-6 rounded">
          <h2 className="text-2xl font-bold mb-4">Uredi profil</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 font-medium">Spol</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">Odaberi spol</option>
                <option value="male">Muški</option>
                <option value="female">Ženski</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Datum rođenja</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Visina (cm)</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Težina (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Broj obroka dnevno</label>
              <select
                name="mealsDaily"
                value={formData.mealsDaily}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="1">1-2</option>
                <option value="2">3</option>
                <option value="3">3+</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Fizička aktivnost sedmično</label>
              <select
                name="exercise"
                value={formData.exercise}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="1">Bez aktivnosti</option>
                <option value="2">1-2 dana</option>
                <option value="3">3-4 dana</option>
                <option value="4">5-6 dana</option>
                <option value="5">6+ dana</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Dnevni unos tečnosti</label>
              <select
                name="liquidIntake"
                value={formData.liquidIntake}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="1">Manje od 1L</option>
                <option value="2">1-2L</option>
                <option value="3">Preko 2L</option>
              </select>
            </div>

            <Button type="submit" variant="primary" fullWidth>
              Spasi izmjene
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditHealthForm;
