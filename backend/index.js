import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db.js"; // Conexión a la base de datos con Sequelize
import userRoutes from "./routes/routeUser.js"; // Rutas de usuario
import contactRoutes from "./routes/routeContact.js"
import cors from 'cors';

// importa modelos
import Department from "./models/departmentModel.js";
import Role from "./models/roleModel.js";
import Contact from "./models/contactModel.js";
import RoleUser from "./models/roleUserModel.js";
import User from "./models/userModel.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173', // Dirección de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  credentials: true // Para permitir cookies, tokens o sesiones
}));

app.use(express.json());

// Servir imágenes estáticas
app.use('/uploads', express.static('uploads'));

// Rutas
app.use("/users", userRoutes);
app.use("/contacts", contactRoutes);

// Verificar conexión a la base de datos antes de iniciar el servidor
const startServer = async () => {
  try {
    // Verificación de conexión a la base de datos
    await sequelize.authenticate(); 

    // Sincronizar los modelos con la base de datos
    await sequelize.sync({ alter: true  });
    console.log("Tablas sincronizadas exitosamente");

    // Si la conexión es exitosa, iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error.message);
    process.exit(1); // Detener el proceso si la conexión falla
  }
};

startServer();

