const User = require("../../Models/UserModel");
const AppErr = require("../../Utils/AppErr");
const bcrypt = require("bcrypt");
const generateToken = require("../../Utils/GenToken");
const generate_reset_code = require("../../Utils/GenResetCode");
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new AppErr("Invalid Login Credentails", 400));
    }
    const password_match = await bcrypt.compare(password, user.password);
    if (!password_match) {
      return next(new AppErr("Inavlid Login Credentials", 400));
    }

    res.json({
      status: "Success",
      firstName: user.name.split(" ")[0] || user.name,
      lastName: user.name.split(" ")[1] || "",
      id: user.id,
      token: generateToken(user.id),
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });

    if (userFound) {
      return next(new AppErr("Email already in use", 400));
    }
    const salt = await bcrypt.genSalt(10);
    const hashed_pass = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashed_pass,
    });

    res.json({
      status: "Success",
      firstName: user.name.split(" ")[0] || user.name,
      lastName: user.name.split(" ")[1] || "",
      id: user.id,
      token: generateToken(user.id),
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

const get_profile = async (req, res, next) => {
  const id = req.user;
  try {
    const userFound = await User.findById(id);
    res.json(userFound);
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

const update_profile = async (req, res, next) => {
  const { name, email, password } = req.body;
  const id = req.user;
  const update_data = { name, email };
  try {
    if (password) {
      const salt = await bcrypt.genSalt(10);
      update_data.password = await bcrypt.hash(password, salt);
    }
    const user_found = await User.findByIdAndUpdate(id, update_data, {
      new: true,
    });
    if (!user_found) {
      return next(new AppErr("User Not Found", 404));
    }
    res.json({ status: "Success" });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};
const delete_profile = async (req, res, next) => {
  const id = req.user;
  try {
    const user_found = await User.findByIdAndDelete(id);
    if (!user_found) {
      return next(new AppErr("User not found", 404));
    }
    res.json({ status: "Success" });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};
const reset_password = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user_found = User.findOne({ email });

    if (!user_found) {
      return next(new AppErr("User Not Found", 400));
    }

    const reset_code = generate_reset_code();
    user_found.reset_code = reset_code;
    await user_found.save();
    /**
     * Add logic to send email to users email
     */

    res.json({
      status: "Success",
      message: "Reset code generated and saved successfully",
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};
const verify_reset_password = async (req, res, next) => {
  const { reset_code, email } = req.body;
  try {
    const user_found = User.findOne({ email });

    if (!user_found) {
      return next(new AppErr("User Not Found", 400));
    }
    const resetCodeMatches = user_found.reset_code == reset_code;
    if (!resetCodeMatches) {
      return next(new AppErr("Invalid Reset Code", 400));
    }
    res.json({
      status: "Success",
      firstName: user_found.name.split(" ")[0] || user_found.name,
      lastName: user_found.name.split(" ")[1] || "",
      id: user_found.id,
      token: generateToken(user_found.id),
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

module.exports = {
  login,
  register,
  get_profile,
  update_profile,
  delete_profile,
  reset_password,
  verify_reset_password,
};
