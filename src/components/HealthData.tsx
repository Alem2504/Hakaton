// src/pages/HealthData.tsx
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase.config';

interface UserData {
  height: number;
  weight: number;
  mealsDaily: string;
  exercise: string;
  liquidIntake: string;
  profileCompleted: boolean;
}

const HealthData: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        setUserData(userDocSnap.data() as UserData);
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Loading health data...</p>;
  }

  if (!userData) {
    return <p>No health data found.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Zdravstveni podaci</h2>
      <ul className="space-y-2">
        <li>Visina: {userData.height} cm</li>
        <li>Težina: {userData.weight} kg</li>
        <li>Broj obroka dnevno: {userData.mealsDaily}</li>
        <li>Fizička aktivnost: {userData.exercise}</li>
        <li>Dnevni unos tečnosti: {userData.liquidIntake}</li>
      </ul>
    </div>
  );
};

export default HealthData;
