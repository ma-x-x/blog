import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { formatResultData } from './../utils/formatResult';
import userService from '@/services/users.service';
import menuService from '@/services/menus.service';
import { Menu } from './../interfaces/menus.interface';
import { sortBy } from 'lodash';
import { makeTree } from '@/utils/formatToTree';

class MenusController {
  public userService = new userService();
  public menuService = new menuService();

  public getMenus = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      let menus = await this.menuService.findMenusByUserId(req.user.id);
      let newMenus = [];
      let newMenusMap = {};
      // 去重
      for (let menu of menus) {
        if (!newMenusMap[menu.id]) {
          newMenus.push(menu);
          newMenusMap[menu.id] = true;
        }
      }
      let menusTree = makeTree(newMenus, 0);
      res.status(200).json(formatResultData({ result: menusTree }));
    } catch (error) {
      next(error);
    }
  };

  public getAllMenus = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      let menus = await this.menuService.findAllMenus();
      let menusTree = makeTree(menus, 0);
      res.status(200).json(formatResultData({ result: menusTree }));
    } catch (error) {
      next(error);
    }
  };

  public getMenusSelect = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      let menus = await this.menuService.findMenusSelect();
      let menusTree = makeTree(menus, 0);
      res.status(200).json(formatResultData({ result: menusTree }));
    } catch (error) {
      next(error);
    }
  };
}

export default MenusController;
