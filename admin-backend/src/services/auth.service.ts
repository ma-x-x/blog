import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import DB from '@databases';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import { EXPIRES_IN } from '@/config';

class AuthService {
  public users = DB.Users;

  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, '请求参数错误!');
    for (let item in userData) {
      if (!userData[item]) {
        throw new HttpException(400, `参数${item}不能为空！`);
      }
    }

    const findUserById: User = await this.users.findOne({
      where: { username: userData.username },
    });

    if (findUserById) throw new HttpException(409, `用户名已存在`);

    const findUserByEmail: User = await this.users.findOne({
      where: { email: userData.email },
    });

    if (findUserByEmail) throw new HttpException(409, `邮箱已存在`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({
      ...userData,
      password: hashedPassword,
    });

    return createUserData;
  }

  public async login(userData: LoginUserDto): Promise<{ cookie: string; token: string; findUser: User }> {
    if (isEmpty(userData)) throw new HttpException(400, '用户名和密码不得为空');

    const findUser: User = await this.users.findOne({
      where: { username: userData.username },
    });

    if (!findUser) throw new HttpException(409, `用户名不存在`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, '用户名或密码不匹配');

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { token: tokenData.token, cookie, findUser };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({
      where: { username: userData.username, password: userData.password },
    });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id, username: user.username };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = Number(EXPIRES_IN) ?? 60 * 60;

    return {
      expiresIn,
      token: sign(dataStoredInToken, secretKey, { expiresIn }),
    };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
