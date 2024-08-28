const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc Login
// @route POST /auth
// @access Public
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  const foundUser = await User.findOne({ email }).exec();

  if (!foundUser || !foundUser.accountStatus) {
    return res.status(401).json({
      message: "No existe una cuenta asociada a este correo",
    });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) return res.status(401).json({ message: "Contraseña incorrecta" });

  const accessToken = jwt.sign(
    {
      UserInfo: {
        email: foundUser.email,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { email: foundUser.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  // Create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken });
};

// @desc Refresh
// @route GET /auth/refresh
// @access Public - se ejecuta cuando el tiempo del accessToken se ha terminado
const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt)
    return res
      .status(401)
      .json({ message: "No tienes permiso para acceder a este recurso" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err)
        return res
          .status(403)
          .json({ message: "Acceso prohibido a este recurso" });

      const foundUser = await User.findOne({
        email: decoded.email,
      }).exec();

      if (!foundUser)
        return res
          .status(401)
          .json({ message: "No tienes permiso para acceder a este recurso" });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            email: foundUser.email,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    }
  );
};

// @desc Logout
// @route POST /auth/logout
// @access Public - Limpia la cookie si existe
const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Se ha limpiado la cookie" });
};

module.exports = {
  login,
  refresh,
  logout,
};
