import Team from "../models/Teams.js";

export const requireTeamAccess = async (req, res, next) => {
  const teamId = req.params.id;
  const user = req.user;

  const team = await Team.findById(teamId);
  if (!team) return res.status(404).json({ message: "Equipo no encontrado" });

  const isAdmin = user.role === "admin";
  const isOwner = team.lider.toString() === user.id;
  const isMember = team.miembros.map(m => m.toString()).includes(user.id);

  if (!isAdmin && !isOwner && !isMember) {
    return res.status(403).json({ message: "Sin permiso" });
  }

  req.team = team;
  next();
};
export const requireTeamOwner = async (req, res, next) => {
  const team = req.team || await Team.findById(req.params.id);
  const user = req.user;

  const isAdmin = user.role === "admin";
  const isOwner = team.lider.toString() === user.id;

  if (!isAdmin && !isOwner) {
    return res.status(403).json({ message: "Solo el dueño puede hacer esto" });
  }

  next();
};
