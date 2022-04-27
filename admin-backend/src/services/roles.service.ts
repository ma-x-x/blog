import { hash } from 'bcrypt';
import DB from '@databases';
import { CreateRoleDto, QueryRolesDto } from '@dtos/roles.dto';
import { HttpException } from '@exceptions/HttpException';
import { Role } from '@interfaces/roles.interface';
import { isEmpty } from '@utils/util';
import { Op } from 'sequelize';

export interface PageRoleResult {
  rows: Role[];
  count: number;
}

class RoleService {
  public roles = DB.Roles;

  public async findRolesByUserId(userId: number): Promise<Role[]> {
    // @ts-ignore
    const roles: number[] = (await this.userRole.findAll({ attributes: ['roleId'], where: { userId } })) as number[];
    const allRole: Role[] = await this.roles.findAll({
      attributes: ['id', 'name', 'code'],
      where: {
        id: { [Op.in]: roles },
      },
    });
    return allRole;
  }

  public async findAllRole({ limit, offset, name }: QueryRolesDto): Promise<PageRoleResult> {
    let where = {};
    if (name) {
      where: {
        name: `%${name ?? ''}%`;
      }
    }
    const allRole: PageRoleResult = await this.roles.findAndCountAll({
      order: [['id', 'DESC']],
      where,
      offset,
      limit,
    });
    return allRole;
  }

  public async findRoleById(roleId: string): Promise<Role> {
    if (isEmpty(roleId)) throw new HttpException(400, '参数roleId不能为空');

    const findRole: Role = await this.roles.findOne({ where: { id: roleId } });
    if (!findRole) throw new HttpException(409, '角色Id不存在');

    return findRole;
  }

  public async createRole(roleData: CreateRoleDto): Promise<Role> {
    if (isEmpty(roleData)) throw new HttpException(400, '参数不能为空');

    const findRole: Role = await this.roles.findOne({
      where: { name: roleData.name },
    });
    if (findRole) throw new HttpException(409, `角色名称已存在`);

    const createRoleData: Role = await this.roles.create(roleData);
    return createRoleData;
  }

  public async updateRole(roleId: number, roleData: CreateRoleDto): Promise<Role> {
    if (isEmpty(roleData)) throw new HttpException(400, '参数不能为空');

    const findRole: Role = await this.roles.findByPk(roleId);
    if (!findRole) throw new HttpException(409, '角色不存在');

    await this.roles.update(roleData, { where: { id: roleId } });

    const updateRole: Role = await this.roles.findByPk(roleId);
    return updateRole;
  }

  public async deleteRole(roleId: number): Promise<Role> {
    if (isEmpty(roleId)) throw new HttpException(400, '参数roleId不能为空');

    const findRole: Role = await this.roles.findByPk(roleId);
    if (!findRole) throw new HttpException(409, '角色不存在');

    await this.roles.destroy({ where: { id: roleId } });

    return findRole;
  }
}

export default RoleService;
