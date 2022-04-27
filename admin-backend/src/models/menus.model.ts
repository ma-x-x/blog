import { Sequelize, DataTypes, Model, Optional, Op } from 'sequelize';
import { Menu } from '@/interfaces/menus.interface';

export type MenuCreationAttributes = Optional<Menu, 'id'>;

export class MenuModel extends Model<Menu, MenuCreationAttributes> implements Menu {
  public id: number;
  public name: string;
  public parentId: string;
  public path: string;
  public component: string;
  public icon: string;
  public sort: number;
  public visible: 0 | 1;
  public redirect: string;
  public meta: {
    title: string;
    icon: string;
    redirect: string;
  };

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof MenuModel {
  MenuModel.init(
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
      parentId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      path: {
        type: DataTypes.STRING(128),
      },
      component: {
        type: DataTypes.STRING(128),
      },
      icon: {
        type: DataTypes.STRING(128),
      },
      sort: {
        type: DataTypes.INTEGER,
      },
      visible: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      redirect: {
        type: DataTypes.STRING(128),
      },
      meta: {
        type: DataTypes.VIRTUAL,
        get() {
          return { title: this.name, icon: this.icon, redirect: this.redirect };
        },
      },
    },
    {
      tableName: 'menus',
      sequelize,
    },
  );

  return MenuModel;
}
