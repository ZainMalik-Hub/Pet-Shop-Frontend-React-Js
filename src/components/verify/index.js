import React from "react";
import { FaCheck } from "react-icons/fa";
import "./VerificationSuccess.css";

const VerificationSuccess = () => {
  return (
    <div className='verification-success-container'>
      <div className='verification-success-icon'>
        <FaCheck />
      </div>
      <div className='verification-success-text'>
        <p>Your verification was successful!</p>
      </div>
    </div>
  );
};

export default VerificationSuccess;
