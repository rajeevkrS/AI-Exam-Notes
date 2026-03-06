import axios from "axios";
import { backendUrl } from "../App";
import { setUserData } from "../redux/userSlice";

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
