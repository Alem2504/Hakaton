import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase.config';
import Sidebar from '../components/Sidebar';

interface UserData {
  height: number;
  weight: number;
  mealsDaily: string;
  exercise: string;
  liquidIntake: string;
  profileCompleted: boolean;
}

interface ObesityData {
  overweightFamilies: string;
  fastFood: string;
  vegetables: string;
  mealsDaily: string;
  foodBetweenMeals: string;
  smoking: string;
  liquidIntake: string;
  calorieCalc: string;
  physicalExercise: string;
  techHours: string;
  transport: string;
}

const HealthData: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [obesityData, setObesityData] = useState<ObesityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const obesityDoc = await getDoc(doc(db, 'obesity-predictions', user.uid));

      if (userDoc.exists()) {
        setUserData(userDoc.data() as UserData);
      }

      if (obesityDoc.exists()) {
        setObesityData(obesityDoc.data() as ObesityData);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex min-h-screen"><Sidebar /><div className="ml-64 p-6">Učitavanje...</div></div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64 p-6 space-y-8">
        {/* Zdravstveni podaci */}
        <div className="max-w-2xl mx-auto bg-white shadow rounded p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Zdravstveni podaci</h2>
          {userData ? (
            <ul className="space-y-3 text-gray-700">
              <li><strong>Visina:</strong> {userData.height} cm</li>
              <li><strong>Težina:</strong> {userData.weight} kg</li>
              <li><strong>Broj obroka dnevno:</strong> {userData.mealsDaily}</li>
              <li><strong>Fizička aktivnost:</strong> {userData.exercise}</li>
              <li><strong>Dnevni unos tečnosti:</strong> {userData.liquidIntake}</li>
              <li><strong>Status profila:</strong> {userData.profileCompleted ? 'Završen ✅' : 'Nije završen ❌'}</li>
            </ul>
          ) : (
            <p>Podaci o profilu nisu pronađeni.</p>
          )}
        </div>

        {/* Podaci o faktorima rizika */}
        <div className="max-w-2xl mx-auto bg-white shadow rounded p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Faktori rizika</h2>
          {obesityData ? (
            <ul className="space-y-3 text-gray-700">
              <li><strong>Prekomjerna težina u porodici:</strong> {obesityData.overweightFamilies === '1' ? 'Da' : 'Ne'}</li>
              <li><strong>Brza hrana:</strong> {obesityData.fastFood === '1' ? 'Da' : 'Ne'}</li>
              <li><strong>Konzumacija povrća:</strong> {mapLevel(obesityData.vegetables)}</li>
              <li><strong>Obroci dnevno:</strong> {mapMeals(obesityData.mealsDaily)}</li>
              <li><strong>Grickalice:</strong> {mapFrequency(obesityData.foodBetweenMeals)}</li>
              <li><strong>Pušenje:</strong> {obesityData.smoking === '1' ? 'Da' : 'Ne'}</li>
              <li><strong>Dnevni unos tečnosti:</strong> {mapLiquid(obesityData.liquidIntake)}</li>
              <li><strong>Računanje kalorija:</strong> {obesityData.calorieCalc === '1' ? 'Da' : 'Ne'}</li>
              <li><strong>Fizička aktivnost:</strong> {mapExercise(obesityData.physicalExercise)}</li>
              <li><strong>Vrijeme pred ekranom:</strong> {mapTechHours(obesityData.techHours)}</li>
              <li><strong>Transport:</strong> {mapTransport(obesityData.transport)}</li>
            </ul>
          ) : (
            <p>Podaci o faktorima rizika nisu pronađeni.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Map funkcije za prikaz vrijednosti
const mapLevel = (val: string) => ({
  '1': 'Rijetko',
  '2': 'Ponekad',
  '3': 'Uvijek',
})[val] || '-';

const mapMeals = (val: string) => ({
  '1': '1-2',
  '2': '3',
  '3': '3+',
})[val] || '-';

const mapFrequency = (val: string) => ({
  '1': 'Rijetko',
  '2': 'Ponekad',
  '3': 'Obično',
  '4': 'Uvijek',
})[val] || '-';

const mapLiquid = (val: string) => ({
  '1': '<1L',
  '2': '1-2L',
  '3': '>2L',
})[val] || '-';

const mapExercise = (val: string) => ({
  '1': 'Bez aktivnosti',
  '2': '1-2 dana',
  '3': '3-4 dana',
  '4': '5-6 dana',
  '5': '6+ dana',
})[val] || '-';

const mapTechHours = (val: string) => ({
  '1': '0-2 sata',
  '2': '3-5 sati',
  '3': '5+ sati',
})[val] || '-';

const mapTransport = (val: string) => ({
  '1': 'Automobil',
  '2': 'Motor',
  '3': 'Bicikl',
  '4': 'Javni prevoz',
  '5': 'Pješačenje',
})[val] || '-';

export default HealthData;
