const User = require("../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
// const { emailConfirmacion } = require("../middleware/emailSender");

// @desc Crea un usuario
// @route POST /usuarios
// @access Private
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const duplicatedEmail = await User.findOne({ email })
      .collation({ locale: "en", strength: 3 })
      .collation({ locale: "es", strength: 3 })
      .lean()
      .exec();

    if (duplicatedEmail) {
      return res.status(409).json({
        message: "Ya existe una cuenta con esta dirección de correo",
      });
    }
    // const token = crypto.randomBytes(20).toString("hex");
    const userObject = new User({
      name,
      email,
      password,
    });
    const user = await userObject.save();
    // if (user) {
    //   emailConfirmacion({
    //     name: name,
    //     email: email,
    //     token: token,
    //   });
    // }
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc Obtiene todos los usuarios
// @route GET /usuarios
// @access Private
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc Obtiene un usuario
// @route GET /usuarios/:id
// @access Private
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    } else {
      const isIgual = await user.comparePassword("12343");
      console.log(isIgual);
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc Actualiza datos de usuario
// @route PATCH /usuarios/:id
// @access Private
const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    } else {
      res.status(200).json({ message: "Usuario actualizado" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc Elimina un usuario
// @route DELETE /usuarios/:id
// @access Private
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
