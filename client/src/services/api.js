import axios from "axios";
import { backendUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../utils/firebase";

// ✅ iOS Token Fallback Helper
export const authHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Login
export const loginWithGoogle = async (dispatch) => {
  try {
    const response = await signInWithPopup(auth, provider);

    const User = response.user;

    const result = await axios.post(
      backendUrl + "/api/auth/google",
      {
        name: User.displayName,
        email: User.email,
      },
      { withCredentials: true },
    );

    dispatch(setUserData(result.data));

    if (result.data.token) {
      localStorage.setItem("token", result.data.token);
    }

    return result.data;
  } catch (error) {
    if (
      error.code === "auth/popup-closed-by-user" ||
      error.code === "auth/cancelled-popup-request"
    ) {
      console.log("User closed login popup");
      return null;
    }
    console.error("Google Login Error:", error);
    return null;
  }
};

// Logout
export const logoutUser = async (dispatch) => {
  try {
    await axios.post(
      backendUrl + "/api/auth/logout",
      {},
      {
        withCredentials: true,
        headers: authHeaders(),
      },
    );

    await signOut(auth);
    localStorage.removeItem("token");
    dispatch(setUserData(null));
  } catch (error) {
    localStorage.removeItem("token");
    dispatch(setUserData(null));
  }
};

// Get Current User
export const getCurrentUser = async (dispatch) => {
  try {
    const result = await axios.get(backendUrl + "/api/user/currentuser", {
      withCredentials: true,
      headers: authHeaders(),
    });

    dispatch(setUserData(result.data));
  } catch (error) {
    dispatch(setUserData(null));
  }
};

// Generate Notes
export const generateNotes = async (payload) => {
  try {
    const result = await axios.post(
      backendUrl + "/api/notes/generate-notes",
      payload,
      {
        withCredentials: true,
        headers: authHeaders(),
      },
    );

    return result.data;
  } catch (error) {
    const message = error?.response?.data?.message || error.message;
    throw new Error(message);
  }
};

// Download PDF
export const downloadPDF = async (result) => {
  try {
    const response = await axios.post(
      backendUrl + "/api/pdf/generate-pdf",
      { result },
      {
        responseType: "blob",
        withCredentials: true,
        headers: authHeaders(),
      },
    );

    const blob = new Blob([response.data], {
      type: "application/pdf",
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "PrepMateAI.pdf";
    link.click();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.log("Error in downloading PDF: ", error);
  }
};
