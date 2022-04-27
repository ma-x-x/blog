import { Router } from 'express';
import DictsController from '@controllers/dicts.controller';
import { CreateDictDto } from '@dtos/dicts.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class DictsRoute implements Routes {
  public path = '/dicts';
  public router: Router = Router();
  public dictsController = new DictsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.dictsController.getDicts);
    this.router.get(`${this.path}/:id(\\d+)`, this.dictsController.getDictById);
    this.router.post(`${this.path}`, validationMiddleware(CreateDictDto, 'body'), this.dictsController.createDict);
    this.router.put(
      `${this.path}/:id(\\d+)`,
      validationMiddleware(CreateDictDto, 'body', true),
      this.dictsController.updateDict,
    );
    this.router.delete(`${this.path}/:id(\\d+)`, this.dictsController.deleteDict);
  }
}

export default DictsRoute;
