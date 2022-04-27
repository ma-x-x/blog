import { Sequelize, DataTypes, Model, Optional, Op } from 'sequelize';

export class RoleMenuModel extends Model {}

export default function (sequelize: Sequelize): typeof RoleMenuModel {
  RoleMenuModel.init({}, { tableName: 'role_menu', sequelize, timestamps: false });

  return RoleMenuModel;
}
