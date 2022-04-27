import { IsString, IsEmail, IsNumber } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  public offset: number;

  @IsNumber()
  public limit: number;
}
