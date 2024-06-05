import UserModel from "../models/userModel.js";
import bcrypt from 'bcrypt';

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({
            where: { users_username: username }
        });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.users_password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }
        res.json({ message: "Inicio de sesión exitoso" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
