import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config(); // 👈 esto carga las variables del .env antes de todo

export const requireAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token requerido" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    req.user = { id: user._id.toString(), role: user.role, email: user.email };
    next();
  } catch (err) {
    console.error("❌ Error en requireAuth:", err);
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};
