import React, { useState } from 'react';
import { db, auth } from '../firebase/firebase.config';
import {doc, getDoc, setDoc} from 'firebase/firestore';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';

const ObesityForm: React.FC = () => {
  const [formData, setFormData] = useState({
    overweightFamilies: '2',
    fastFood: '2',
    vegetables: '1',
    mealsDaily: '2',
    foodBetweenMeals: '1',
    smoking: '2',
    liquidIntake: '2',
    calorieCalc: '2',
    physicalExercise: '1',
    techHours: '2',
    transport: '1',
  });

  const [result, setResult] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const user = auth.currentUser;
  if (!user) return;

  // 1. Dohvati profilne podatke korisnika
  const profileSnap = await getDoc(doc(db, 'users', user.uid));
  const profileData = profileSnap.exists() ? profileSnap.data() : {};

  // 2. Izdvoji samo što ti treba iz profila
  const { gender, birthDate, height } = profileData as {
    gender: string;
    birthDate: string;
    height: number;
  };

  // 3. Izračunaj godine
  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const combinedData = {
    ...formData,
    gender,
    age: calculateAge(birthDate),
    height,
  };

  // 4. Sačuvaj (opcionalno)
  await setDoc(doc(db, 'obesity-predictions', user.uid), {
    ...formData,
    uid: user.uid,
    timestamp: new Date().toISOString(),
  });

  // 5. Ispiši sve u konzolu
  console.log('PODACI ZA PREDIKCIJU:', combinedData);

  setResult('Podaci uspješno sačuvani. Predikcija će biti prikazana uskoro.');
};

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64 p-6">
        <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
          <h2 className="text-2xl font-bold mb-4">Faktori rizika za gojaznost</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label>Prekomjerna težina u porodici</label>
              <select name="overweightFamilies" value={formData.overweightFamilies} onChange={handleChange} className="w-full border p-2 rounded">
                <option value="1">Da</option>
                <option value="2">Ne</option>
              </select>
            </div>

            <div>
              <label>Brza hrana</label>
              <select name="fastFood" value={formData.fastFood} onChange={handleChange} className="w-full border p-2 rounded">
                <option value="1">Da</option>
                <option value="2">Ne</option>
              </select>
            </div>

            <div>
              <label>Konzumacija povrća</label>
              <select name="vegetables" value={formData.vegetables} onChange={handleChange} className="w-full border p-2 rounded">
                <option value="1">Rijetko</option>
                <option value="2">Ponekad</option>
                <option value="3">Uvijek</option>
              </select>
            </div>

            <div>
              <label>Obroci dnevno</label>
              <select name="mealsDaily" value={formData.mealsDaily} onChange={handleChange} className="w-full border p-2 rounded">
                <option value="1">1-2</option>
                <option value="2">3</option>
                <option value="3">3+</option>
              </select>
            </div>

            <div>
              <label>Grickalice između obroka</label>
              <select name="foodBetweenMeals" value={formData.foodBetweenMeals} onChange={handleChange} className="w-full border p-2 rounded">
                <option value="1">Rijetko</option>
                <option value="2">Ponekad</option>
                <option value="3">Obično</option>
                <option value="4">Uvijek</option>
              </select>
            </div>

            <div>
              <label>Pušenje</label>
              <select name="smoking" value={formData.smoking} onChange={handleChange} className="w-full border p-2 rounded">
                <option value="1">Da</option>
                <option value="2">Ne</option>
              </select>
            </div>

            <div>
              <label>Dnevni unos tečnosti</label>
              <select name="liquidIntake" value={formData.liquidIntake} onChange={handleChange} className="w-full border p-2 rounded">
                <option value="1">Manje od 1L</option>
                <option value="2">1-2L</option>
                <option value="3">Preko 2L</option>
              </select>
            </div>

            <div>
              <label>Računanje kalorija</label>
              <select name="calorieCalc" value={formData.calorieCalc} onChange={handleChange} className="w-full border p-2 rounded">
                <option value="1">Da</option>
                <option value="2">Ne</option>
              </select>
            </div>

            <div>
              <label>Fizička aktivnost</label>
              <select name="physicalExercise" value={formData.physicalExercise} onChange={handleChange} className="w-full border p-2 rounded">
                <option value="1">Bez aktivnosti</option>
                <option value="2">1-2 dana</option>
                <option value="3">3-4 dana</option>
                <option value="4">5-6 dana</option>
                <option value="5">6+ dana</option>
              </select>
            </div>

            <div>
              <label>Vrijeme pred ekranom</label>
              <select name="techHours" value={formData.techHours} onChange={handleChange} className="w-full border p-2 rounded">
                <option value="1">0-2 sata</option>
                <option value="2">3-5 sati</option>
                <option value="3">5+ sati</option>
              </select>
            </div>

            <div>
              <label>Tip prevoza</label>
              <select name="transport" value={formData.transport} onChange={handleChange} className="w-full border p-2 rounded">
                <option value="1">Automobil</option>
                <option value="2">Motor</option>
                <option value="3">Bicikl</option>
                <option value="4">Javni prevoz</option>
                <option value="5">Pješačenje</option>
              </select>
            </div>

            <Button type="submit" variant="primary" fullWidth>
              Spasi i prikaži rezultat
            </Button>
          </form>

          {result && (
            <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded">
              <p className="text-green-800 font-medium">{result}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ObesityForm;
