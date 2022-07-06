import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {} from "express-async-errors";
import * as userRepository from "../data/auth.js";

const jwtSecretkey = "nq&zX@bjLuboU*$zkX3CfV#RBd!mkWv^";
const jwtExpiresInDays = "2d";
const bscryptSaltRounds = 10;

export async function signup(req, res) {
  const { email, password, nickname } = req.body;
  const found = await userRepository.findByEmail(email);

  if (found) {
    return res.status(409).json({ message: `${email} already exists` });
  }

  const hashed = await bcrypt.hash(password, bscryptSaltRounds);
  const userId = await userRepository.createUser({
    password: hashed,
    nickname,
    email,
  });

  const token = createJwtToken(userId);
  res.status(201).json({ token, email });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await userRepository.findByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Invalid user or password" });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid user or password" });
  }
  const token = createJwtToken(user.id);
  res.status(200).json({ token, email });
}

function createJwtToken(id) {
  return jwt.sign({ id }, jwtSecretkey, { expiresIn: jwtExpiresInDays });
}

export async function me(req, res) {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    token: req.token,
    email: user.email,
    id: user.id,
  });
}
