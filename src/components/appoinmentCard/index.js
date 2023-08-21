import React, { useState } from "react";
import "./appointmentCard.scss";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
// import predictedDisease from "";
// import predictedDisease from "../"
import PredictedDisease from "../../components/predictedDisease";

import axios from "axios";
const PetAppointmentCard = () => {
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const history = useHistory();

  const handlePetNameChange = (event) => {
    setPetName(event.target.value);
  };

  const handlePetTypeChange = (event) => {
    setPetType(event.target.value);
  };

  const handleAppointmentDateChange = (event) => {
    setAppointmentDate(event.target.value);
  };

  const handleAppointmentTimeChange = (event) => {
    setAppointmentTime(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      return toast.warning("Please Login First! ");
    }
    console.log("Pet Name:", petName);
    console.log("Pet Type:", petType);
    console.log("Appointment Date:", appointmentDate);
    console.log("Appointment Time:", appointmentTime);
    AppointmentFunction(event, user);
  };

  function AppointmentFunction(e, user) {
    return axios
      .post(process.env.REACT_APP_BASE_URL + "/appointment", {
        userId: user._id,
        petName: petName,
        date: appointmentDate,
        time: appointmentTime,
        petType: petType,
      })
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          toast.success("Appointment Request Successfully Created ! ");
          // localStorage.setItem("user", JSON.stringify(response.data.results));
          history.push("/");
        }

        // setLoading(false);
        return response.data;
      })
      .catch(
        (err) => (
          console.log("message", err.response.data.message),
          toast.error(err.response.data.message)
          //   setLoading(false)
        )
      );
  }

  // function predictDisease() {
  //   const symptoms = document.getElementById("symptoms").value;
  //   fetch("/api/predict?symptoms=" + encodeURIComponent(symptoms))
  //     .then((response) => response.json())
  //     .then((prediction) => {
  //       const predictionElement = document.getElementById("prediction");
  //       predictionElement.innerHTML =
  //         "The predicted disease is: " + prediction.disease;
  //     });
  //   return false;
  // }
  // const symptomDiseaseMap = {
  //   fever: ["common cold", "flu", "COVID-19"],
  //   cough: ["common cold", "flu", "pneumonia", "COVID-19"],
  //   "shortness of breath": ["asthma", "pneumonia", "COVID-19"],
  //   headache: ["migraine", "common cold", "flu"],
  //   nausea: ["food poisoning", "stomach flu"],
  //   vomiting: ["food poisoning", "stomach flu"],
  //   diarrhea: ["food poisoning", "stomach flu"],
  //   fatigue: ["migraine", "common cold", "flu", "pneumonia", "COVID-19"],
  //   "muscle aches": ["flu", "pneumonia"],
  //   "sore throat": ["common cold", "flu", "COVID-19"],
  //   "loss of taste/smell": ["COVID-19"],
  // };

  // function predictDisease() {
  //   // Get the user input
  //   const symptomsInput = document.getElementById("symptoms").value;
  //   const symptoms = symptomsInput.toLowerCase().split(", ");

  //   // Find the diseases that match the symptoms
  //   let matchedDiseases = [];
  //   for (const [symptom, diseases] of Object.entries(symptomDiseaseMap)) {
  //     if (symptoms.includes(symptom)) {
  //       matchedDiseases.push(...diseases);
  //     }
  //   }

  //   // Remove duplicates from the matched diseases list
  //   matchedDiseases = [...new Set(matchedDiseases)];

  //   // Display the predicted diseases
  //   const diseaseOutput = document.getElementById("disease-output");
  //   diseaseOutput.innerHTML =
  //     matchedDiseases.join(", ") || "No matching diseases found.";

  //   // Prevent the form from submitting
  //   return false;
  // }
  return (
    <div className='pet-appointment-card'>
      {/* <form onsubmit='return predictDisease()'>
        <label for='symptoms'>Symptoms:</label>
        <input
          type='text'
          id='symptoms'
          name='symptoms'
          placeholder='Enter symptoms separated by commas'
        />

        <button type='submit'>Predict Disease</button>
      </form> */}

      {/* <PredictedDisease /> */}

      <form onSubmit={handleSubmit}>
        <label htmlFor='pet-name-input'>Pet Name</label>
        <input
          id='pet-name-input'
          type='text'
          placeholder='Enter pet name'
          value={petName}
          onChange={handlePetNameChange}
          required
        />

        <label htmlFor='pet-type-select'>Pet Type</label>
        <select
          id='pet-type-select'
          value={petType}
          onChange={handlePetTypeChange}
          required>
          <option value=''>Select pet type</option>
          <option value='dog'>Dog</option>
          <option value='cat'>Cat</option>
          <option value='bird'>Bird</option>
        </select>

        <label htmlFor='appointment-date-input'>Appointment Date</label>
        <input
          id='appointment-date-input'
          type='date'
          value={appointmentDate}
          onChange={handleAppointmentDateChange}
          required
        />

        <label htmlFor='appointment-time-input'>Appointment Time</label>
        <input
          id='appointment-time-input'
          type='time'
          value={appointmentTime}
          onChange={handleAppointmentTimeChange}
          required
        />

        <button type='submit'>Book Appointment</button>
      </form>
      <div style={{ marginTop: 30 }}>
        <PredictedDisease />
      </div>
    </div>
  );
};

export default PetAppointmentCard;
