// src/pages/EditHealthForm.tsx
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase.config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Button from '../components/Button';

interface UserData {
  height: number;
  weight: number;
  mealsDaily: string;
  exercise: string;
  liquidIntake: string;
  profileCompleted: boolean;
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

  if (loading) return <p>Učitavanje podataka...</p>;
  if (!formData) return <p>Nema podataka za prikaz.</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Uredi zdravstvene podatke</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
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
  );
};

export default EditHealthForm;
