import { NextFunction, Request, Response } from 'express';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import { RequestWithUser } from '@interfaces/auth.interface';
import AuthService from '@services/auth.service';
import { logger } from '@/utils/logger';
import { formatResultData } from '@/utils/formatResult';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);

      res.status(201).json(formatResultData({ result: signUpUserData }));
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: LoginUserDto = req.body;
      const { cookie, token, findUser } = await this.authService.login(userData);
      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json(
        formatResultData({
          result: {
            username: findUser.username,
            email: findUser.email,
            id: findUser.id,
            access_token: token,
          },
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json(formatResultData({ result: logOutUserData }));
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
