import { IsString, IsEmail, IS_NUMBER_STRING, IsNumber } from 'class-validator';
import { PaginationDto } from './base.dto';

export class CreateDictDto {
  @IsNumber()
  public id: number;

  @IsString()
  public name: string;

  @IsString()
  public code: string;

  @IsNumber()
  public sort: number;

  @IsNumber()
  public status: 1 | 0; //用户状态：1-正常 0-禁用

  @IsNumber()
  public deleted: 0 | 1; //逻辑删除标识：0-未删除；1-已删除
}

export class QueryDictsDto extends PaginationDto {
  @IsString()
  public name: string;
}
