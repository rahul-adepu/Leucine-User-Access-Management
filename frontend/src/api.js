import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const loginAPI = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      username,
      password,
    });

    const { token, role } = response.data;
    console.log(role);

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Login failed",
    };
  }
};

export const signupAPI = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signup`, formData);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Signup failed",
    };
  }
};
