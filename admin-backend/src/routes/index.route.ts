import AuthRoute from './auth.route';
import UsersRoute from './users.route';
import RolesRoute from './roles.route';
import MenusRoute from './menus.route';
import DictsRoute from './dicts.route';

export default [new UsersRoute(), new AuthRoute(), new RolesRoute(), new MenusRoute(), new DictsRoute()];
