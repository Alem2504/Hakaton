from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)

# Dozvoli sve izvore + sve metode (POST, OPTIONS itd.)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Učitaj model
model = joblib.load("obesity_model.pkl")

# Redoslijed kolona kao kod treniranja
columns = [
    "Sex", "Age", "Height", "Overweight_Obese_Family", "Consumption_of_Fast_Food",
    "Frequency_of_Consuming_Vegetables", "Number_of_Main_Meals_Daily", "Food_Intake_Between_Meals",
    "Smoking", "Liquid_Intake_Daily", "Calculation_of_Calorie_Intake", "Physical_Excercise",
    "Schedule_Dedicated_to_Technology", "Type_of_Transportation_Used"
]

@app.route("/predict", methods=["POST", "OPTIONS"])
def predict():
    print("➡️  Pozvana ruta /predict")
    if request.method == "OPTIONS":
        # CORS preflight handling
        response = jsonify({})
        response.status_code = 204
        return response

    try:
        data = request.get_json(force=True)
        if not data or "features" not in data:

            return jsonify({"error": "Missing data"}), 400

        input_df = pd.DataFrame([data["features"]], columns=columns)
        probs = model.predict_proba(input_df)[0]
        classes = model.classes_

        result = {f"Class_{int(c)}": round(float(p) * 100, 2) for c, p in zip(classes, probs)}
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    # Ovako je najsigurnije da radi i za localhost i za Postman
    app.run(host="0.0.0.0", port=5050, debug=True)
