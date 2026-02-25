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
