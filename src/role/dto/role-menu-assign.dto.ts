import { IsNotEmpty, IsOptional } from 'class-validator';

export class RoleMenuAssisgnDto {
  @IsNotEmpty()
  roleCode: string;

  @IsOptional()
  menuIds?: string[];
}
