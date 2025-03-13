import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Role from './roleModel.js';
import Department from './departmentModel.js';

const Contact = sequelize.define('Contact', {
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  other_phone: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.STRING,
    validate: {
      isIn: [['M', 'F']], // Validar que sea 'M' o 'F'
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true, // Validar que sea un correo válido
    },
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
  RoleId: {  // Definir explícitamente la clave foránea de Role
    type: DataTypes.INTEGER,
    allowNull: false,  // O true, según tu lógica
  },
  DepartmentId: {  // Definir explícitamente la clave foránea de Department
    type: DataTypes.INTEGER,
    allowNull: true,  // Según si es obligatorio o no
  },
});

// Definir relaciones
Contact.belongsTo(Role, { foreignKey: 'RoleId', as: 'role' });
Contact.belongsTo(Department, { foreignKey: 'DepartmentId', as: 'department' });

export default Contact;
