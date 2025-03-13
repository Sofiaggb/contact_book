import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import bcrypt from 'bcrypt';
import RoleUser from './roleUserModel.js'; // Importa el modelo de roles

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 100],
    },
  },
}, {
  timestamps: false,
});

// **Relación: Un usuario pertenece a un solo rol**
User.belongsTo(RoleUser, { foreignKey: 'roleId', as: 'role' });


// Exportar el modelo
export default User;

