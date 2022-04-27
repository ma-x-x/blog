import { Sequelize, DataTypes, Model, Optional, Op } from 'sequelize';
import { Permissions } from '@/interfaces/permissions.interface';

export type PermissionAttributes = Optional<Permissions, 'id'>;

export class PermissionModel extends Model<Permissions, PermissionAttributes> implements Permissions {
  public id: number;
  public name: string;
  public menuId: string;
  public urlPerm: string;
  public btnPerm: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof PermissionModel {
  PermissionModel.init(
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
      menuId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      urlPerm: {
        type: DataTypes.STRING(128),
      },
      btnPerm: {
        type: DataTypes.STRING(128),
      },
    },
    {
      tableName: 'permissions',
      sequelize,
    },
  );

  return PermissionModel;
}
