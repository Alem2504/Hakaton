import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';
import Sidebar from '../components/Sidebar';

interface UserData {
  ime?: string;
  height?: number;
  weight?: number;
  mealsDaily?: string;
  exercise?: string;
  liquidIntake?: string;
  profileCompleted?: boolean;
  gender?: string;
  birthDate?: string;
}

interface ObesityData {
  overweightFamilies?: string;
  fastFood?: string;
  vegetables?: string;
  mealsDaily?: string;
  foodBetweenMeals?: string;
  smoking?: string;
  liquidIntake?: string;
  calorieCalc?: string;
  physicalExercise?: string;
  techHours?: string;
  transport?: string;
}

const UserProfile: React.FC = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [obesityData, setObesityData] = useState<ObesityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      const userDoc = await getDoc(doc(db, 'users', id));
      const obesityDoc = await getDoc(doc(db, 'obesity-predictions', id));

      if (userDoc.exists()) setUserData(userDoc.data() as UserData);
      if (obesityDoc.exists()) setObesityData(obesityDoc.data() as ObesityData);

      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="flex min-h-screen"><Sidebar /><div className="ml-64 p-6">Učitavanje podataka...</div></div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64 p-6 space-y-8">
        <div className="bg-white p-6 shadow rounded max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Lični podaci</h2>
          <ul className="space-y-2">
            <li><strong>Ime:</strong> {userData?.ime || '-'}</li>
            <li><strong>Spol:</strong> {userData?.gender || '-'}</li>
            <li><strong>Datum rođenja:</strong> {userData?.birthDate || '-'}</li>
            <li><strong>Visina:</strong> {userData?.height} cm</li>
            <li><strong>Težina:</strong> {userData?.weight} kg</li>
            <li><strong>Obroci dnevno:</strong> {userData?.mealsDaily}</li>
            <li><strong>Fizička aktivnost:</strong> {userData?.exercise}</li>
            <li><strong>Unos tečnosti:</strong> {userData?.liquidIntake}</li>
          </ul>
        </div>

        <div className="bg-white p-6 shadow rounded max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Faktori rizika</h2>
          {obesityData ? (
            <ul className="space-y-2">
              <li><strong>Porodična gojaznost:</strong> {obesityData.overweightFamilies}</li>
              <li><strong>Brza hrana:</strong> {obesityData.fastFood}</li>
              <li><strong>Povrće:</strong> {obesityData.vegetables}</li>
              <li><strong>Obroci dnevno:</strong> {obesityData.mealsDaily}</li>
              <li><strong>Grickalice:</strong> {obesityData.foodBetweenMeals}</li>
              <li><strong>Pušenje:</strong> {obesityData.smoking}</li>
              <li><strong>Tečnost:</strong> {obesityData.liquidIntake}</li>
              <li><strong>Računanje kalorija:</strong> {obesityData.calorieCalc}</li>
              <li><strong>Fizička aktivnost:</strong> {obesityData.physicalExercise}</li>
              <li><strong>Vrijeme pred ekranom:</strong> {obesityData.techHours}</li>
              <li><strong>Prevoz:</strong> {obesityData.transport}</li>
            </ul>
          ) : <p>Podaci o faktorima rizika nisu pronađeni.</p>}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;