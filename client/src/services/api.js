import axios from "axios";
import { backendUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../utils/firebase";

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
      localStorage.setItem("token", result.data.token); // iOS fallback
    }

    return result.data;
  } catch (error) {
    // HANDLE Login Popups window closed
    if (
      error.code === "auth/popup-closed-by-user" ||
      error.code === "auth/cancelled-popup-request"
    ) {
      console.log("User closed login popup");
      return null; // silent fail
    }

    // REAL ERRORS ONLY
    console.error("Google Login Error:", error);
    return null;
  }
};

// Logout
export const logoutUser = async (dispatch) => {
  try {
    const localToken = localStorage.getItem("token");
    await axios.post(
      backendUrl + "/api/auth/logout",
      {},
      {
        withCredentials: true,
        headers: localToken ? { Authorization: `Bearer ${localToken}` } : {},
      },
    );
    await signOut(auth);
    localStorage.removeItem("token"); // clear localStorage too
    dispatch(setUserData(null));
  } catch (error) {
    localStorage.removeItem("token");
    dispatch(setUserData(null));
  }
};

export const getCurrentUser = async (dispatch) => {
  try {
    const localToken = localStorage.getItem("token");
    const result = await axios.get(backendUrl + "/api/user/currentuser", {
      withCredentials: true,
      headers: localToken ? { Authorization: `Bearer ${localToken}` } : {},
    });
    dispatch(setUserData(result.data));
  } catch (error) {
    dispatch(setUserData(null));
  }
};

export const generateNotes = async (payload) => {
  try {
    const result = await axios.post(
      backendUrl + "/api/notes/generate-notes",
      payload,
      { withCredentials: true },
    );
    // console.log(result.data);

    return result.data;
  } catch (error) {
    console.log("Error in Frontend generating Notes: ", error);
  }
};

export const downloadPDF = async (result) => {
  try {
    const response = await axios.post(
      backendUrl + "/api/pdf/generate-pdf",
      { result },
      {
        responseType: "blob",
        withCredentials: true,
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
