import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
// ---------- REGISTER ----------
export const register = async (req, res) => {
  try {
    const { name, email, pin } = req.body;

    if (!name || !email || !pin)
      return res.status(400).json({ error: "Todos los campos son requeridos" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "El usuario ya existe" });

    const hashedPin = await bcrypt.hash(pin, 10);

    const user = await User.create({ name, email, pin: hashedPin });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "✅ Usuario registrado",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------- LOGIN ----------
export const login = async (req, res) => {
  try {
    const { email, pin } = req.body;

    if (!email || !pin)
      return res.status(400).json({ error: "Email y PIN requeridos" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Usuario no encontrado" });

    const validPin = await bcrypt.compare(pin, user.pin);
    if (!validPin) return res.status(401).json({ error: "PIN incorrecto" });

    const token = jwt.sign({ id: user._id, email: user.email, }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "✅ Acceso concedido",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------- GET USER DATA ----------
export const getUserData = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "Token requerido" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id).select("-pin");
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
// ---------- DELETE ACCOUNT ----------
export const deleteAccount = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ error: "Token requerido" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user)
      return res.status(404).json({ error: "Usuario no encontrado" });

    await User.findByIdAndDelete(decoded.id);

    res.status(200).json({ message: "🗑️ Cuenta eliminada correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// ---------- TEST TOKEN ----------
export const testToken = (req, res) => {
  try {
    const samplePayload = {
      id: "69093e6726f43fc786405c11", // ID de prueba
      email: "mateoteresani.com"
    };

    const token = jwt.sign(samplePayload, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "🔑 Token generado correctamente",
      token,
      note: "Usá este token en Postman para probar rutas protegidas (Authorization: Bearer TOKEN)"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

