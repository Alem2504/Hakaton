import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import Button from "../components/Button";

const HealthForm: React.FC = () => {
  const navigate = useNavigate();

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [mealsDaily, setMealsDaily] = useState("3");
  const [exercise, setExercise] = useState("1");
  const [liquidIntake, setLiquidIntake] = useState("2");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;

    await setDoc(doc(db, "users", user.uid), {
      height,
      weight,
      mealsDaily,
      exercise,
      liquidIntake,
      profileCompleted: true,
    }, { merge: true });

    navigate("/dashboard");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Unesi osnovne zdravstvene podatke</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 font-medium">Visina (cm)</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} required className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Težina (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Broj obroka dnevno</label>
          <select value={mealsDaily} onChange={(e) => setMealsDaily(e.target.value)} className="w-full border p-2 rounded">
            <option value="1">1-2</option>
            <option value="2">3</option>
            <option value="3">3+</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Fizička aktivnost sedmično</label>
          <select value={exercise} onChange={(e) => setExercise(e.target.value)} className="w-full border p-2 rounded">
            <option value="1">Bez aktivnosti</option>
            <option value="2">1-2 dana</option>
            <option value="3">3-4 dana</option>
            <option value="4">5-6 dana</option>
            <option value="5">6+ dana</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Dnevni unos tečnosti</label>
          <select value={liquidIntake} onChange={(e) => setLiquidIntake(e.target.value)} className="w-full border p-2 rounded">
            <option value="1">Manje od 1L</option>
            <option value="2">1-2L</option>
            <option value="3">Preko 2L</option>
          </select>
        </div>
        <Button type="submit" variant="primary" fullWidth>
          Spasi podatke
        </Button>
      </form>
    </div>
  );
};

export default HealthForm;