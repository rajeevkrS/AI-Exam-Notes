import axios from "axios";
import { backendUrl } from "../App";
import { setUserData } from "../redux/userSlice";

export const logoutUser = async () => {
  try {
    await axios.get(backendUrl + "/api/auth/logout", {
      withCredentials: true,
    });
  } catch (error) {
    console.log("Logout error:", error);
  }
};

export const getCurrentUser = async (dispatch) => {
  try {
    const result = await axios.get(backendUrl + "/api/user/currentuser", {
      withCredentials: true,
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
    console.log(result.data);

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
