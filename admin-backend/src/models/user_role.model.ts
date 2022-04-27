import { Sequelize, DataTypes, Model, Optional, Op } from 'sequelize';

export class UserRoleModel extends Model {}

export default function (sequelize: Sequelize): typeof UserRoleModel {
  UserRoleModel.init({}, { tableName: 'user_role', sequelize, timestamps: false });

  return UserRoleModel;
}
