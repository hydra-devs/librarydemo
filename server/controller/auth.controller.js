import validator from "validator";
import bycrypt from "bcrypt";

export const register = async (req, res) => {
  const { email, username, fullname, password } = req.body;
  //input validation
  if (!email || !username || !fullname || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Enter a valid email address" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ success: false, message: "Password is less than 6 characters" });
  } else if (password.length > 16) {
    return res.status(400).json({
      success: false,
      message: "Password is greater than 16 characters",
    });
  }

  //hashing password
  const HashPassword = await bycrypt.hash(password, 10);
  res.json({ HashPassword });
};
