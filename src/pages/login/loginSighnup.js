import React, { useEffect, useState } from "react";
import "./loginSignup.scss";
import login from "../../store/services";
import { toast } from "react-toastify";
import Loading from "../../_global/loading";
import { useHistory } from "react-router-dom";

import axios from "axios";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase";

function LoginSighnup() {
  const history = useHistory();
  const provider = new GoogleAuthProvider();

  const handleClick = () => {
    history.push("/about");
  };
  const [userName, setUserName] = useState("");
  const [password, setPassWord] = useState("");

  const [email2, setEmail2] = useState("");
  const [password2, setPassword2] = useState("");
  const [userName2, setUserName2] = useState("");
  const [loading, setLoading] = useState(false);
  document.addEventListener("DOMContentLoaded", function () {
    var signUpButton = document.getElementById("signUp");
    var signInButton = document.getElementById("signIn");
    var container = document.getElementById("container");

    signUpButton.addEventListener("click", function () {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", function () {
      container.classList.remove("right-panel-active");
    });
  });

  function SignUpFunction(e) {
    e.preventDefault();
    setLoading(true);
    if (!userName2) {
      toast.warning("Please Write UserName");
      setLoading(false);
      return;
    }

    if (!email2) {
      toast.warning("Please Write Email");
      setLoading(false);
      return;
    }
    if (!password2) {
      toast.warning("Please Write password");
      setLoading(false);
      return;
    }
    return axios
      .post(process.env.REACT_APP_BASE_URL + "/auth/register", {
        username: userName2,
        email: email2,
        password: password2,
      })
      .then((response) => {
        console.log("response", response.data);
        if (response.status === 201 || response.status === 200) {
          toast.success("Register Success");
          // localStorage.setItem("user", JSON.stringify(response.data.results));
          history.push("/email-check");
        }

        setLoading(false);
        return response.data;
      })
      .catch(
        (err) => (
          console.log("message", err.response.data.message),
          toast.error(err.response.data.message),
          setLoading(false)
        )
      );
  }
  function LoginFunction(e) {
    e.preventDefault();
    console.log("helo");
    setLoading(true);
    if (!userName) {
      toast.warning("Please Write UserName");
      setLoading(false);
      return;
    }

    if (!password) {
      toast.warning("Please Write password");
      setLoading(false);
      return;
    }

    axios
      .post(process.env.REACT_APP_BASE_URL + "/auth/login", {
        email: userName,
        password: password,
      })
      .then((response) => {
        console.log("response", response?.data?.results);
        if (response?.data?.results?.accessToken) {
          if (!response?.data?.results?.verified) {
            // console.log("erroruuuu", response?.data?.results?.verified);

            return history.push("/email-check");
          } else if (response?.data?.results?.role === "admin") {
            localStorage.setItem("user", JSON.stringify(response.data.results));
            return history.push("/admin-home");
          } else {
            localStorage.setItem("user", JSON.stringify(response.data.results));
            toast.success("Login Success");

            setLoading(false);
            return history.push("/");
          }
        }
      })
      .catch(
        (err) => (
          toast.error(err.response.data.message || err.message),
          console.log("errorr", err.message),
          setLoading(false)
        )
      );
  }
  function googleRegister() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);

        return axios
          .post(process.env.REACT_APP_BASE_URL + "/auth/registergoogle", {
            username: result.user.displayName,
            email: result.user.email,
            password: "vetcare54",
          })
          .then((response) => {
            console.log("response", response.data.results);
            if (response.status === 201 || response.status === 200) {
              // toast.success("Registation Success");
              localStorage.setItem(
                "user",
                JSON.stringify(response.data.results)
              );
              history.push("/");
            }

            setLoading(false);
            return response.data;
          })
          .catch(
            (err) => (
              console.log("message", err),
              toast.error(err.response.data.message),
              setLoading(false)
            )
          );

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
        // ...
      });
  }

  function forgotPasswordFunction() {
    if (!userName) {
      toast.warning("Please Enter Email !");
    }
    if (userName) {
    }
  }

  return (
    <div className='bodyLoginSignup'>
      <div class='container' id='container'>
        <Loading isOpen={loading} />
        <div class='form-container sign-up-container'>
          <form action='#'>
            <h1>Create Account</h1>
            <div class='social-container'>
              <a href='#' class='social' onClick={() => googleRegister()}>
                <i class='fab fa-google-plus-g'></i>
              </a>
            </div>
            <span>or use your email for registration</span>
            <input
              type='text'
              onChange={(e) => setUserName2(e.target.value)}
              placeholder='Name'
            />
            <input
              type='email'
              onChange={(e) => setEmail2(e.target.value)}
              placeholder='Email'
            />
            <input
              type='password'
              onChange={(e) => setPassword2(e.target.value)}
              placeholder='Password'
            />
            <button onClick={(e) => SignUpFunction(e)}>Sign Up</button>
          </form>
        </div>
        <div class='form-container sign-in-container'>
          <form action='#'>
            <h1>Sign in</h1>
            <div class='social-container'>
              <a href='#' class='social' onClick={(e) => googleRegister(e)}>
                <i class='fab fa-google-plus-g'></i>
              </a>
            </div>
            <span>or use your account</span>
            <input
              type='text'
              placeholder='Email'
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type='password'
              placeholder='Password'
              onChange={(e) => setPassWord(e.target.value)}
            />
            <a href='#' onClick={(e) => forgotPasswordFunction(e)}>
              Forgot your password?
            </a>
            <button onClick={(e) => LoginFunction(e)}>Sign In</button>
          </form>
        </div>
        <div class='overlay-container'>
          <div class='overlay'>
            <div class='overlay-panel overlay-left'>
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button class='ghost' id='signIn'>
                Sign In
              </button>
            </div>
            <div class='overlay-panel overlay-right'>
              <h1>Welcome to the VetCare!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button class='ghost' id='signUp'>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginSighnup;
