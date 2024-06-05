import UserModel from "../models/userModel.js";
import bcrypt from 'bcrypt';

export const showUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { users_password, ...otherFields } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(users_password, 10);
    await UserModel.create({
      ...otherFields,
      users_password: hashedPassword,
      users_profile_image: '/uploads/profile.png'  // Asegurar que se establece la imagen predeterminada
    });
    res.json({
      message: "¡Registro creado correctamente!"
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await UserModel.findAll({
      where: { users_id: req.params.id }
    });
    res.json(user[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { users_name, users_lastname, users_email, users_birthdate, users_username } = req.body;
    const user = await UserModel.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.users_name = users_name;
    user.users_lastname = users_lastname;
    user.users_email = users_email;
    user.users_birthdate = users_birthdate;
    user.users_username = users_username;

    await user.save();
    res.json({
      message: '¡Registro actualizado correctamente!',
      profileImage: user.users_profile_image
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

