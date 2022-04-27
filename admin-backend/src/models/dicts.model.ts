import { Sequelize, DataTypes, Model, Optional, Op } from 'sequelize';
import { Dict } from '@/interfaces/dicts.interface';

export type DictCreationAttributes = Optional<Dict, 'id'>;

export class DictModel extends Model<Dict, DictCreationAttributes> implements Dict {
  public id: number;
  public dictName: string;
  public dictCode: string;
  public name: string;
  public value: string;
  public sort: number;
  public status: 0 | 1;
  public defaulted: 0 | 1;
  public remark: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof DictModel {
  DictModel.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      dictCode: {
        type: DataTypes.STRING(64),
      },
      dictName: {
        type: DataTypes.STRING(64),
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(64),
      },
      value: {
        allowNull: false,
        type: DataTypes.STRING(64),
      },
      sort: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      defaulted: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      remark: {
        allowNull: true,
        type: DataTypes.STRING(128),
      },
    },
    {
      tableName: 'dicts',
      sequelize,
    },
  );

  return DictModel;
}
