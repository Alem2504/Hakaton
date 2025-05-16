// src/components/PredictObesity.tsx
import { useState } from "react";

interface UserData {
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

interface PredictObesityProps {
  userData: UserData;
  obesityData: ObesityData;
}

const PredictObesity: React.FC<PredictObesityProps> = ({ userData, obesityData }) => {
  const [prediction, setPrediction] = useState<Record<string, number> | { error: string } | null>(null);

  const mapToModelInput = (): number[] => {
    const getAge = (birthDate: string | undefined): number => {
      if (!birthDate) return 30;
      const birth = new Date(birthDate);
      return new Date().getFullYear() - birth.getFullYear();
    };

    return [
      userData.gender === "male" ? 1 : 2,
      getAge(userData.birthDate),
      userData.height,
      Number(obesityData.overweightFamilies),
      Number(obesityData.fastFood),
      Number(obesityData.vegetables),
      Number(obesityData.mealsDaily),
      Number(obesityData.foodBetweenMeals),
      Number(obesityData.smoking),
      Number(obesityData.liquidIntake),
      Number(obesityData.calorieCalc),
      Number(obesityData.physicalExercise),
      Number(obesityData.techHours),
      Number(obesityData.transport),
    ];
  };

  const handlePredict = async () => {
    try {
      const modelInput = mapToModelInput();
      const res = await fetch("http://localhost:5050/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: modelInput }),
      });

      if (!res.ok) throw new Error("Greška u API pozivu");

      const data = await res.json();
      setPrediction(data);
    } catch (error) {
      console.error("Greška:", error);
      setPrediction({ error: "Nije moguće dobiti predikciju." });
    }
  };

  return (
    <div className="p-4 border rounded shadow-md bg-white">
      <button
        onClick={handlePredict}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
      >
        Izračunaj rizik od gojaznosti
      </button>

      {prediction && "error" in prediction && (
        <p className="text-red-600 mt-4">{prediction.error}</p>
      )}

      {prediction && !("error" in prediction) && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Rezultati:</h3>
          <ul className="space-y-1">
            {Object.entries(prediction).map(([k, v]) => (
              <li key={k} className="text-gray-800">
                {k.replace("Class_", "Klasa ")}: <span className="font-semibold">{v}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PredictObesity;
