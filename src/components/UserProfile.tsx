import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';
import Sidebar from './NavbarD';

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
  const [selectedAction, setSelectedAction] = useState('');
  const [inputValue, setInputValue] = useState('');

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

  const handleSubmit = async () => {
    if (!id || !selectedAction || !inputValue.trim()) return;

    const ref = doc(db, `${selectedAction}`, id);
    await setDoc(ref, { value: inputValue, timestamp: new Date().toISOString() });
    setInputValue('');
    alert(`${selectedAction.charAt(0).toUpperCase() + selectedAction.slice(1)} sačuvan!`);
  };

  if (loading) return <div className="min-h-screen">Učitavanje podataka...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Sidebar />
      </div>

      <div className="pt-20 max-w-5xl mx-auto p-6 space-y-8">
        <div className="bg-white p-6 shadow rounded">
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

        <div className="bg-white p-6 shadow rounded">
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

        <div className="bg-white p-6 shadow rounded space-y-4">
          <h2 className="text-2xl font-bold">Unos nove informacije</h2>
          <select
            className="w-full border p-2 rounded"
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
          >
            <option value="">Odaberi akciju</option>
            <option value="diagnoses">Dijagnoza</option>
            <option value="therapies">Terapija</option>
            <option value="prescriptions">Recept</option>
          </select>

          {selectedAction && (
            <div className="space-y-2">
              <textarea
                rows={4}
                className="w-full border p-2 rounded"
                placeholder={`Unesi ${selectedAction}...`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              ></textarea>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Spasi
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
