import { IsString, IsEmail, IsNumber, IsArray } from 'class-validator';
import { PaginationDto } from './base.dto';

export class CreateUserDto {
  @IsString()
  public username: string;

  @IsEmail()
  public email?: string;

  @IsString()
  public password: string;

  @IsString()
  public nickname: string;

  @IsArray()
  public roleIds?: number[];

  @IsNumber()
  public gender?: 1 | 2;

  @IsNumber()
  public status?: 1 | 0;
}

export class LoginUserDto {
  @IsString()
  public username: string;

  @IsString()
  public password: string;
}

export class QueryUsersDto extends PaginationDto {
  @IsString()
  public keywords: string;

  @IsNumber()
  public status: number;
}
