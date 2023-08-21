import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL;

const register = (username, email, password) => {
  return axios
    .post(API_URL + "/auth/register", {
      username,
      email,
      password,
    })
    .then((response) => {
      if (response.data.results.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data.results));
      }
      return response.data;
    });
};

const login = (userName, password) => {
  return axios
    .post(process.env.REACT_APP_BASE_URL + "/auth/login", {
      username: userName,
      password: password,
    })
    .then((response) => {
      console.log("res", response);
      //   if (response.data.results.accessToken) {
      //     localStorage.setItem("user", JSON.stringify(response.data.results));
      //   }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
