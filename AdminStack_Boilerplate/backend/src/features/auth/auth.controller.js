import { AuthService } from "./auth.service.js";

export const register = async (req, res) => {
  try {
    const { name, email, pin } = req.body;
    const data = await AuthService.register(name, email, pin);
    res.status(201).json({ message: "Usuario registrado", ...data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, pin } = req.body;
    const data = await AuthService.login(email, pin);
    res.json({ message: "Acceso concedido", ...data });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const getUserData = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const user = await AuthService.getUserData(token);
    res.json({ user });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    await AuthService.deleteAccount(token);
    res.json({ message: "Cuenta eliminada" });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const testToken = (req, res) => {
  try {
    const token = AuthService.generateTestToken();
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
