import { Sequelize, Model } from 'sequelize';

export class RolePermissionModel extends Model {}

export default function (sequelize: Sequelize): typeof RolePermissionModel {
  RolePermissionModel.init({}, { tableName: 'role_permission', sequelize, timestamps: false });

  return RolePermissionModel;
}
