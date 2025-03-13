import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const RoleUser = sequelize.define('RoleUser', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default RoleUser;
