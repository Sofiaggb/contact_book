import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const tokenBlacklist = new Set();

export const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado, token no proporcionado' });
    }

    if (tokenBlacklist.has(token)) {
        return res.status(403).json({ error: 'Token inválido o expirado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido o expirado' });
        }

        req.user = decoded;  // Almacena la información del usuario en la solicitud
        next();  // Continúa con la siguiente función
    });
};

// Logout para agregar el token a la lista negra
export const logout = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        tokenBlacklist.add(token); // Añade el token a la lista negra
    }
    res.status(200).json({ message: 'Cierre de sesión exitoso' });
};
