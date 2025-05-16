// src/pages/AiPredictionPage.tsx
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase.config";
import PredictObesity from "./PredicObesity";
import Sidebar from "./Sidebar.tsx";

interface UserData {
  ime?: string;
  height: number;
  weight: number;
  mealsDaily: string;
  exercise: string;
  liquidIntake: string;
  profileCompleted: boolean;
  gender?: string;
  birthDate?: string;
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

const AiPredictionPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [obesityData, setObesityData] = useState<ObesityData | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("Korisnik nije prijavljen.");
        return;
      }

      const userDocRef = doc(db, "users", user.uid);
      const obesityDocRef = doc(db, "obesity-predictions", user.uid);

      const userDocSnap = await getDoc(userDocRef);
      const obesityDocSnap = await getDoc(obesityDocRef);

      console.log("userDoc.exists:", userDocSnap.exists());
      console.log("obesityDoc.exists:", obesityDocSnap.exists());

      if (userDocSnap.exists()) {
        const data = userDocSnap.data() as UserData;
        setUserData(data);
        setUserName(data.ime || user.email || "Korisnik");
      }

      if (obesityDocSnap.exists()) {
        const obesity = obesityDocSnap.data() as ObesityData;
        setObesityData(obesity);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!userData || !obesityData) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold">AI Predikcija Gojaznosti</h2>
        <p className="text-gray-700">Učitavanje podataka...</p>
      </div>
    );
  }

 return (
  <div className="flex min-h-screen bg-gray-50">
    {/* Sidebar sa fiksnom širinom */}
    <div className="w-64">
      <Sidebar />
    </div>

    {/* Glavni sadržaj */}
    <div className="flex-1 p-6">
      <h2 className="text-2xl font-bold mb-4">AI Predikcija Gojaznosti</h2>
      <p className="mb-4 text-gray-700">
        Dobrodošao, <span className="font-semibold">{userName}</span>
      </p>
      <PredictObesity userData={userData} obesityData={obesityData} />
    </div>
  </div>
);


};

export default AiPredictionPage;