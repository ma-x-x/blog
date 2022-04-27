import { NextFunction, Request, RequestHandler, Response } from 'express';
import { CreateUserDto, QueryUsersDto } from '@dtos/users.dto';
import { RequestWithUserPage, User } from '@interfaces/users.interface';
import userService, { PageUserResult } from '@services/users.service';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { formatResultData } from './../utils/formatResult';
import roleService from '@services/roles.service';

class UsersController {
  public userService = new userService();
  public roleService = new roleService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queryParams = req.query as unknown as QueryUsersDto;
      const findAllUsersData: PageUserResult = await this.userService.findAllUser(queryParams);
      let result = Number.isInteger(queryParams.offset)
        ? { list: findAllUsersData.rows, total: findAllUsersData.count }
        : findAllUsersData.rows;

      res.status(200).json(
        formatResultData({
          result,
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  public getCurrentUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const findOneUserData: User = await this.userService.findCurrentUser(userId);
      res.status(200).json(formatResultData({ result: findOneUserData }));
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const username = req.params.username;
      const findOneUserData: User = await this.userService.findUserById(username);

      res.status(200).json(formatResultData({ result: findOneUserData }));
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const createUserData: User = await this.userService.createUser(userData);
      res.status(201).json(formatResultData({ result: createUserData }));
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const username = Number(req.params.id);
      const userData: CreateUserDto = req.body;
      const updateUserData: User = await this.userService.updateUser(username, userData);
      res.status(200).json(formatResultData({ result: updateUserData }));
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const username = Number(req.params.id);
      const deleteUserData: User = await this.userService.deleteUser(username);
      res.status(200).json(formatResultData({ result: deleteUserData }));
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
