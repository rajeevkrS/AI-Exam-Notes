import UserModel from "../models/User.js";
import { getToken } from "../utils/token.js";

export const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Finding user using email
    let user = await UserModel.findOne({ email });

    // Creating user using name and email
    if (!user) {
      user = await UserModel.create({ name, email });
    }

    // fetching token
    let token = await getToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Google Sign up Error: ${error}` });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({ message: "Logout Successfully!" });
  } catch (error) {
    return res.status(500).json({ message: `Logout Error: ${error}` });
  }
};
