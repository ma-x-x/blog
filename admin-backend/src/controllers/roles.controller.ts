import { NextFunction, Request, Response } from 'express';
import { CreateRoleDto, QueryRolesDto } from '@dtos/roles.dto';
import { Role } from '@interfaces/roles.interface';
import roleService, { PageRoleResult } from '@services/roles.service';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { formatResultData } from './../utils/formatResult';

class RolesController {
  public roleService = new roleService();

  public getRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queryParams = req.query as unknown as QueryRolesDto;
      const findAllRolesData: PageRoleResult = await this.roleService.findAllRole(queryParams);
      let result = Number.isInteger(queryParams.offset)
        ? { list: findAllRolesData.rows, total: findAllRolesData.count }
        : findAllRolesData.rows;

      res.status(200).json(formatResultData({ result }));
    } catch (error) {
      next(error);
    }
  };

  public getRoleById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleId = req.params.roleId;
      const findOneRoleData: Role = await this.roleService.findRoleById(roleId);

      res.status(200).json(formatResultData({ result: findOneRoleData }));
    } catch (error) {
      next(error);
    }
  };

  public createRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleData: CreateRoleDto = req.body;
      const createRoleData: Role = await this.roleService.createRole(roleData);
      res.status(201).json(formatResultData({ result: createRoleData }));
    } catch (error) {
      next(error);
    }
  };

  public updateRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleId = Number(req.params.id);
      const roleData: CreateRoleDto = req.body;
      const updateRoleData: Role = await this.roleService.updateRole(roleId, roleData);
      res.status(200).json(formatResultData({ result: updateRoleData }));
    } catch (error) {
      next(error);
    }
  };

  public deleteRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleId = Number(req.params.id);
      const deleteRoleData: Role = await this.roleService.deleteRole(roleId);
      res.status(200).json(formatResultData({ result: deleteRoleData }));
    } catch (error) {
      next(error);
    }
  };
}

export default RolesController;
