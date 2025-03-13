import Department from '../models/departmentModel.js';
import Role from '../models/roleModel.js';
import RoleUser from '../models/roleUserModel.js';

import { departmentsResponseSchema } from '../schemas/departmentSchema.js';
import { rolesResponseSchema } from '../schemas/roleShema.js';


export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll();
    const validDepartments = departmentsResponseSchema.parse(departments);

    res.status(200).json(validDepartments);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los departamentos" });
  }
};

export const getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    const validRoles = rolesResponseSchema.parse(roles);

    res.status(200).json(validRoles);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los roles" });
  }
};

export const getRoleUsers = async (req, res) => {
  try {
    const roles = await RoleUser.findAll();
    const validRoles = rolesResponseSchema.parse(roles);

    res.status(200).json(validRoles);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los roles" });
  }
};
