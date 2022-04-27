import { Sequelize, DataTypes, Model, Optional, Op } from 'sequelize';
import { User } from '@interfaces/users.interface';

export type UserCreationAttributes = Optional<User, 'id' | 'username' | 'email' | 'password'>;

export class UserModel extends Model<User, UserCreationAttributes> implements User {
  public id: number;
  public username: string;
  public password: string;
  public email: string;
  public nickname: string;
  public gender: 1 | 2; //性别：1-男 2-女
  public avatar: string;
  public mobile: number;
  public status: 1 | 0; //用户状态：1-正常 0-禁用
  public deleted: 0 | 1; //逻辑删除标识：0-未删除；1-已删除

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      nickname: {
        type: DataTypes.STRING(64),
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING(45),
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(128),
        unique: true,
      },
      gender: {
        type: DataTypes.INTEGER,
      },
      avatar: {
        type: DataTypes.STRING(255),
      },
      mobile: {
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
      tableName: 'users',
      sequelize,
    },
  );

  return UserModel;
}
