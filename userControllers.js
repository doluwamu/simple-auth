import userQuery from "./queries/userQueries.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "./generateToken.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await new userQuery().allUsers();
    return res.json(users[0]);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password, confirmationPassword } = req.body;

    if (!name || name.length < 1)
      return res
        .status(400)
        .send({ message: "Please provide a valid username!" });
    if (!email || email.length < 1 || !validator.isEmail(email))
      return res.status(400).send({ message: "Please provide a valid email!" });
    if (!password)
      return res.status(400).send({ message: "Please provide a password!" });
    if (!confirmationPassword)
      return res.status(400).send({ message: "Please confirm your password!" });
    if (password !== confirmationPassword)
      return res.status(400).send({ message: "Passwords don't match!" });

    const existingUser = await new userQuery(
      name,
      email,
      password,
    ).userExists();

    if (existingUser[0].length > 0)
      return res
        .status(400)
        .send({ message: "User with this email already exists!" });

    const createdAccount = await new userQuery(
      name,
      email,
      password,
    ).createUserAccount();

    if (!createdAccount)
      return res
        .status(400)
        .send({ message: "There was a problem while creating your account!" });

    return res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || email.length < 1 || !validator.isEmail(email))
      return res.status(400).send({ message: "Please provide a valid email!" });
    if (!password)
      return res.status(400).send({ message: "Please provide a password!" });

    const existingUser = await new userQuery("", email, password).userExists();

    const user = existingUser[0][0];

    if (!existingUser || existingUser[0].length < 1)
      return res.status(400).send({ message: "Invalid email or password!" });

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch)
      return res.status(400).send({ message: "Invalid email or password!" });

    return res.json({
      accessToken: generateAccessToken(user.id),
      refreshToken: generateRefreshToken(user.id),
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const editUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const existingUser = await new userQuery().userExistsById(id);

    const user = existingUser[0][0];

    if (!user || existingUser[0].length < 1)
      return res.status(400).send({ message: "User does not exist!" });

    if (user.id !== parseInt(req.user.id))
      return res.status(400).send({ message: "This is not your account!" });

    const nameToEdit = name ? name : user.name;
    const emailToEdit = email ? email : user.email;
    const passwordToEdit = password ? password : user.password;

    const updateUserInfo = await new userQuery(
      nameToEdit,
      emailToEdit,
      passwordToEdit,
    ).editUser(id);

    if (!updateUserInfo)
      return res
        .status(400)
        .send({ message: "There was a problem while editing your info!" });

    return res.json({ message: "User info successfully updated" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const existingUser = await new userQuery().userExistsById(id);

    const user = existingUser[0][0];

    if (!user || existingUser[0].length < 1)
      return res.status(400).send({ message: "User does not exist!" });

    if (user.id !== parseInt(req.user.id))
      return res.status(400).send({ message: "This is not your account!" });

    const removeUser = await new userQuery().removeUser(id);

    if (!removeUser)
      return res
        .status(400)
        .send({ message: "There was a problem removing this user" });

    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
