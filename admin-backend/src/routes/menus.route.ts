import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import MenusController from '@/controllers/menus.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class UsersRoute implements Routes {
  public path = '/menus';
  public router: Router = Router();
  public menusController = new MenusController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/current${this.path}`, this.menusController.getMenus);
    this.router.get(`${this.path}`, this.menusController.getMenus);
    this.router.get(`${this.path}/select`, this.menusController.getMenusSelect);
  }
}

export default UsersRoute;
