import { hash } from 'bcrypt';
import DB from '@databases';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import { Menu } from '@/interfaces/menus.interface';
import { Model } from 'sequelize';

class UserService {
  public menus = DB.Menus;
  public roles = DB.Roles;

  public async findMenusByRoleId(): Promise<Menu[]> {
    const menus: Menu[] = await this.menus.findAll({
      attributes: { exclude: ['password'] },
      order: [['id', 'DESC']],
      include: [
        {
          model: DB.Roles,
          as: 'roles',
          where: {
            id: 2,
          },
        },
      ],
    });
    return menus;
  }

  public async findMenusByUserId(userId: number): Promise<Menu[]> {
    const menus: Menu[] = await this.menus.findAll({
      attributes: ['id', 'name', 'parentId', 'path', 'component', 'sort', 'meta'],
      where: {
        visible: 1,
      },
      order: [['sort', 'asc']],
      include: [
        {
          model: DB.Roles,
          as: 'roles',
          attributes: [],
          through: { attributes: [] },
          include: [
            {
              model: DB.Users,
              as: 'users',
              attributes: [],
              through: { attributes: [] },
              where: {
                id: 1,
              },
            },
          ],
        },
      ],
      raw: true,
    });
    return menus;
  }

  public async findAllMenus(): Promise<Menu[]> {
    const menus: Menu[] = await this.menus.findAll({
      order: [['sort', 'asc']],
    });
    return menus;
  }

  public async findMenusSelect(): Promise<Menu[]> {
    const menus: Menu[] = await this.menus.findAll({
      attributes: ['id', ['id', 'value'], ['name', 'label'], 'parentId'],
      order: [['sort', 'asc']],
      raw: true, // 查询结果为json. 不加引用
      nest: true,
    });
    return menus;
  }
}

export default UserService;
