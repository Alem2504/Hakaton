import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Sidebar from "./Sidebar.tsx";

interface UserData {
  ime: string;
  height: number;
  weight: number;
  mealsDaily: string;
  exercise: string;
  liquidIntake: string;
  profileCompleted: boolean;
  gender: string;
  birthDate: string;
}

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return navigate('/login');

      const docRef = doc(db, 'users', user.uid);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setUserData(snap.data() as UserData);
      }
    };

    fetchUserData();
  }, [navigate]);

  const calculateBMI = (): string => {
    if (!userData?.height || !userData?.weight) return 'N/A';
    const heightM = userData.height / 100;
    return (userData.weight / (heightM * heightM)).toFixed(1);
  };

  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  if (!userData) return <p>Učitavanje profila...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
        <Sidebar />
      <h2 className="text-2xl font-bold mb-4">Tvoj profil</h2>

      <ul className="space-y-2 text-gray-800">
        <li><strong>Ime:</strong> {userData.ime}</li>
        <li><strong>Spol:</strong> {userData.gender === 'male' ? 'Muški' : 'Ženski'}</li>
        <li><strong>Datum rođenja:</strong> {userData.birthDate}</li>
        <li><strong>Godine:</strong> {calculateAge(userData.birthDate)}</li>
        <li><strong>Visina:</strong> {userData.height} cm</li>
        <li><strong>Težina:</strong> {userData.weight} kg</li>
        <li><strong>BMI:</strong> {calculateBMI()}</li>
        <li><strong>Obroci dnevno:</strong> {userData.mealsDaily}</li>
        <li><strong>Fizička aktivnost:</strong> {userData.exercise}</li>
        <li><strong>Unos tečnosti:</strong> {userData.liquidIntake}</li>
        <li><strong>Status profila:</strong> {userData.profileCompleted ? 'Završen ✅' : 'Nije završen ❌'}</li>
      </ul>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => navigate('/edit-health-form')}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Uredi profil
        </button>
        <button
          onClick={() => navigate('/obesity-form')}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Dodaj faktore rizika
        </button>
      </div>
    </div>
  );
};

export default Profile;
