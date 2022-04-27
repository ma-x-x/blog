import Sequelize from 'sequelize';
import { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from '@config';
import UserModel from '@models/users.model';
import { logger } from '@utils/logger';
import RoleModel from '@/models/roles.model';
import MenuModel from '@/models/menus.model';
import PermissionModel from '@/models/permissions.model';
import DictModel from '@/models/dicts.model';
import UserRoleModel from '@/models/user_role.model';
import RoleMenuModel from '@/models/role_menu.model';
import RolePermissionModel from '@/models/role_permission.model';
const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  dialect: 'mysql',
  host: DB_HOST,
  port: Number(DB_PORT),
  timezone: '+09:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
    acquire: 30000,
    idle: 10000,
  },
  logQueryParameters: NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
  // 格式化时间
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
  },
});

sequelize.authenticate();

const DB = {
  Users: UserModel(sequelize),
  Roles: RoleModel(sequelize),
  Menus: MenuModel(sequelize),
  Dicts: DictModel(sequelize),
  Permissions: PermissionModel(sequelize),
  UserRole: UserRoleModel(sequelize),
  RoleMenu: RoleMenuModel(sequelize),
  RolePermission: RolePermissionModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

// 关联关系
/** 用户-角色--m:n */
DB.Users.belongsToMany(DB.Roles, { through: DB.UserRole, as: 'roles', foreignKey: 'userId' });
DB.Roles.belongsToMany(DB.Users, { through: DB.UserRole, as: 'users', foreignKey: 'roleId' });

/** 角色-菜单-- m:n */
DB.Menus.belongsToMany(DB.Roles, { through: DB.RoleMenu, as: 'roles', foreignKey: 'roleId' });
DB.Roles.belongsToMany(DB.Menus, { through: DB.RoleMenu, as: 'menus', foreignKey: 'menuId' });
/** 角色--权限-- m:n */
DB.Permissions.belongsToMany(DB.Roles, { through: DB.RolePermission, as: 'roles', foreignKey: 'roleId' });
DB.Roles.belongsToMany(DB.Permissions, { through: DB.RolePermission, as: 'permissions', foreignKey: 'permissionId' });

export default DB;
