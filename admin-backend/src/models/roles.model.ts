import { Sequelize, DataTypes, Model, Optional, Op } from 'sequelize';
import { Role } from '@/interfaces/roles.interface';

export type RoleCreationAttributes = Optional<Role, 'id'>;

export class RoleModel extends Model<Role, RoleCreationAttributes> implements Role {
  public id: number;
  public name: string;
  public code: string;
  public sort: number;
  public status: 1 | 0; //用户状态：1-正常 0-禁用
  public deleted: 0 | 1; //逻辑删除标识：0-未删除；1-已删除

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof RoleModel {
  RoleModel.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(64),
      },
      code: {
        allowNull: false,
        type: DataTypes.STRING(45),
        unique: true,
      },
      sort: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      deleted: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: 'roles',
      sequelize,
    },
  );

  return RoleModel;
}
