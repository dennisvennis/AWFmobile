// import axios from "axios";
// import { config } from "../config/config";
// import { useEffect, useState } from "react";
// import asyncStorage from "../utils/asyncStorage";
// const Api = () => {
//   const [token, setToken] = useState("");
//   useEffect(() => {
//     const getToken = async () => {
//       let res = await asyncStorage.getData("token");
//       if (res) {
//         setToken(res);
//       }
//     };
//     getToken();
//   }, [token]);

//   return axios.create({
//     baseURL: config.API_BASE_URL,
//     headers: {
//       Authorization: `Bearer ${token})}`,
//     },
//   });
// };

import axios from "axios";
import { config } from "../config/config";
import asyncStorage from "../utils/asyncStorage";
import { clearUser } from "../store/slices/usersSlice";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";

const Api = () => {
  // const dispatch = useDispatch();

  const instance = axios.create({
    baseURL: config.API_BASE_URL,
  });

  // Request interceptor
  instance.interceptors.request.use(
    async (config) => {
      const token = await asyncStorage.getData("token");

      if (token) {
        // Set the Authorization header with the valid token
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      // You can perform global response handling here
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      // Check if the error is due to an expired token
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        // Perform logout
        Toast.show({ text1: "Session expired, Logged out!" });
        await asyncStorage.clearData("token");
        clearUser();
      }

      return Promise.reject(error);
    }
  );
  return instance;
};

export default Api;
