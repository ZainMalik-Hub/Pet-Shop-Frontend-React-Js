import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../_global/loading";
import VerificationSuccess from "../components/verify";
import jwt_decode from "jwt-decode";
import queryString from "query-string";

function Verify() {
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [isVerificationSuccess, setIsVerificationSuccess] = useState(false);

  const search = location.search;
  const token = search.slice(1);
  const decoded = jwt_decode(token);
  console.log("search", decoded);
  const data = {
    _id: decoded.ID,
    accessToken: token,
    verified: true,
    email: decoded.email,
    username: decoded.username,
    role: decoded.role,
  };
  const handleVerification = () => {
    // perform verification logic here

    setIsVerificationSuccess(true);
  };

  useEffect(() => {
    All();
  }, []);

  async function All() {
    await axios
      .get(process.env.REACT_APP_BASE_URL + `/auth/verify/` + token)
      .then((response) => {
        console.log("response", response);
        console.log(response);
        if (response.status === 201 || response.status === 200) {
          setIsVerificationSuccess(true);
          localStorage.setItem("user", JSON.stringify(data));
          setLoading(false);
          history.push("/");
        }

        setLoading(false);
        return response.data;
      })
      .catch(
        (err) => toast.error(err.response.data.message),
        setIsVerificationSuccess(false),
        setLoading(false)
      );
  }

  return (
    <div>
      <Loading isOpen={loading} />
      {!isVerificationSuccess ? (
        <button onClick={handleVerification}>Verifying...</button>
      ) : null}
      {isVerificationSuccess ? <VerificationSuccess /> : null}
    </div>
  );
}
export default Verify;
