import { hash } from 'bcrypt';
import DB from '@databases';
import { CreateUserDto, QueryUsersDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import { Op } from 'sequelize';

export interface PageUserResult {
  rows: User[];
  count: number;
}

class UserService {
  public users = DB.Users;
  public roles = DB.Roles;
  public userRole = DB.UserRole;

  public async findAllUser(queryParams: QueryUsersDto): Promise<PageUserResult> {
    let where = {};
    if (queryParams.status !== undefined) {
      where['status'] = queryParams.status;
    }
    if (queryParams.keywords) {
      let searchKeywords = `%${queryParams.keywords ?? ''}%`;
      where[Op.or] = [
        { username: { [Op.like]: searchKeywords } },
        { nickname: { [Op.like]: searchKeywords } },
        { mobile: { [Op.like]: searchKeywords } },
      ];
    }
    const allUser: PageUserResult = await this.users.findAndCountAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']],
      where: where,
      offset: queryParams.offset,
      limit: queryParams.limit,
    });
    return allUser;
  }

  // 查询登录用户信息
  public async findCurrentUser(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: User = await this.users.findOne({
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: DB.Roles,
          as: 'roles',
          through: {
            attributes: [],
          },
        },
      ],
      where: { id: userId },
    });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  // 查询用户信息
  public async findUserById(username: string): Promise<User> {
    if (isEmpty(username)) throw new HttpException(400, "You're not username");

    const findUser: User = await this.users.findOne({ attributes: { exclude: ['password'] }, where: { username } });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  // 查询用户菜单信息
  public async findMenusById(userId: number) {
    console.log('userId: ', userId);
    let result: any = await this.roles.findAll({
      include: {
        model: DB.Menus,
        as: 'menus',
      },
      where: { id: 2 },
    });
    const findUser: any = await this.users.findOne({
      attributes: ['username'],
      include: [
        {
          model: DB.Roles,
          as: 'roles',
          attributes: ['id'],
          through: {
            attributes: [],
          },
          include: [
            {
              attributes: ['id', 'name', 'parentId', 'path', 'component', 'sort', 'meta'],
              model: DB.Menus,
              as: 'menus',
              through: { attributes: [] },
              where: {
                visible: 1,
              },
              order: ['sort', 'asc'],
            },
          ],
        },
      ],
      where: { id: userId },
    });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    let findUser: User = await this.users.findOne({
      where: { username: userData.username },
    });
    if (findUser) throw new HttpException(409, `用户名已存在！`);

    findUser = await this.users.findOne({
      where: { email: userData.email },
    });
    if (findUser) throw new HttpException(409, `邮箱已存在！`);

    const hashedPassword = await hash(userData.password, 10);
    const createdUser: User = await this.users.create({
      ...userData,
      password: hashedPassword,
    });
    if (userData.roleIds) {
      let userRoles = userData.roleIds.map((item: any) => ({ userId: createdUser.id, roleId: item }));
      await this.userRole.bulkCreate(userRoles);
    }

    return createdUser;
  }

  public async updateUser(username: number, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findByPk(username);
    if (!findUser) throw new HttpException(409, "You're not user");

    const hashedPassword = await hash(userData.password, 10);
    await this.users.update({ ...userData, password: hashedPassword }, { where: { id: username } });

    const updateUser: User = await this.users.findByPk(username);
    return updateUser;
  }

  public async deleteUser(username: number): Promise<User> {
    if (isEmpty(username)) throw new HttpException(400, "You're not username");

    const findUser: User = await this.users.findByPk(username);
    if (!findUser) throw new HttpException(409, "You're not user");

    await this.users.destroy({ where: { id: username } });

    return findUser;
  }
}

export default UserService;
