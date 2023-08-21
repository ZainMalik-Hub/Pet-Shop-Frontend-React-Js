import React, { useState } from "react";

import "./SymptomsBox.scss";

const symptomDiseaseMap = {
  fever: ["common cold", "flu", "COVID-19"],
  cough: ["common cold", "flu", "pneumonia", "COVID-19"],
  "shortness of breath": ["asthma", "pneumonia", "COVID-19"],
  headache: ["migraine", "common cold", "flu"],
  nausea: ["food poisoning", "stomach flu"],
  vomiting: ["food poisoning", "stomach flu"],
  diarrhea: ["food poisoning", "stomach flu"],
  fatigue: ["migraine", "common cold", "flu", "pneumonia", "COVID-19"],
  "muscle aches": ["flu", "pneumonia"],
  "sore throat": ["common cold", "flu", "COVID-19"],
  "loss of taste/smell": ["COVID-19"],
  rash: ["eczema", "hives", "chickenpox"],
  dizziness: ["low blood pressure", "inner ear problems", "anemia"],
  congestion: ["common cold", "sinusitis", "allergies"],
  runny_nose: ["common cold", "allergies", "sinusitis"],
  chest_pain: ["angina", "heart attack", "pneumonia"],
  swollen_glands: ["mononucleosis", "mumps", "tonsillitis"],
};

function predictDisease(input) {
  const symptoms = input.split(",").map((s) => s.trim().toLowerCase());
  let diseases = [];

  for (const [symptom, relatedDiseases] of Object.entries(symptomDiseaseMap)) {
    if (symptoms.includes(symptom)) {
      diseases = diseases.concat(relatedDiseases);
    }
  }

  return [...new Set(diseases)];
}

const SymptomsBox = () => {
  const [inputSymptoms, setInputSymptoms] = useState("");
  const [predictedDiseases, setPredictedDiseases] = useState([]);

  const handleInputChange = (e) => {
    setInputSymptoms(e.target.value);
  };

  const handlePrediction = () => {
    const diseases = predictDisease(inputSymptoms);
    setPredictedDiseases(diseases);
  };
  return (
    <div className='symptoms-box'>
      <h2 className='symptoms-box__title'>Symptoms:</h2>
      <input
        className='symptoms-box__input'
        type='text'
        placeholder='Enter symptoms separated by comma'
        value={inputSymptoms}
        onChange={handleInputChange}
      />
      <button className='symptoms-box__button' onClick={handlePrediction}>
        Predict disease
      </button>
      {predictedDiseases.length > 0 && (
        <p style={{ marginTop: 10 }}>
          Predicted disease(s):
          {predictedDiseases.join(", ")}
        </p>
      )}
    </div>
  );
};

export default SymptomsBox;
