import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;


export const AuthService = {
  async register(name, email, pin) {
    const exists = await User.findOne({ email });
    if (exists) throw new Error("El usuario ya existe");

    const hashedPin = await bcrypt.hash(pin, 10);
    const user = await User.create({ name, email, pin: hashedPin });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
    };
  },

  async login(email, pin) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Usuario no encontrado");

    const valid = await bcrypt.compare(pin, user.pin);
    if (!valid) throw new Error("PIN incorrecto");

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
    };
  },

  async getUserData(token) {
const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id).select("-pin");
    if (!user) throw new Error("Usuario no encontrado");

    return user;
  },

  async deleteAccount(token) {
const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) throw new Error("Usuario no encontrado");

    await User.findByIdAndDelete(decoded.id);
  },

  generateTestToken() {
    const payload = { id: "69093e6726f43fc786405c11", email: "mateoteresani.com" };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  },
};
