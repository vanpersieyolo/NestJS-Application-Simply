import { RolesGuard } from './../modules/auth/guards/roles.guard';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from '../enum/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (roles: Role[]) => {
  return applyDecorators(SetMetadata(ROLES_KEY, roles), UseGuards(RolesGuard));
};
