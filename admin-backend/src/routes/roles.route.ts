import { Router } from 'express';
import RolesController from '@controllers/roles.controller';
import { CreateRoleDto } from '@dtos/roles.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class RolesRoute implements Routes {
  public path = '/roles';
  public router: Router = Router();
  public rolesController = new RolesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.rolesController.getRoles);
    this.router.get(`${this.path}/:id(\\d+)`, this.rolesController.getRoleById);
    this.router.post(`${this.path}`, validationMiddleware(CreateRoleDto, 'body'), this.rolesController.createRole);
    this.router.put(
      `${this.path}/:id(\\d+)`,
      validationMiddleware(CreateRoleDto, 'body', true),
      this.rolesController.updateRole,
    );
    this.router.delete(`${this.path}/:id(\\d+)`, this.rolesController.deleteRole);
  }
}

export default RolesRoute;
