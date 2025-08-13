import { applyDecorators, UseGuards } from '@nestjs/common'
import { UserRole } from '@prisma/__generated__'

import { AuthGuard } from '../guards/auth.guard'
import { RoleGuard } from '../guards/roles.guard'

import { Roles } from './roles.decorator'

export function Authorization(...roles: UserRole[]) {
	if (roles.length > 0) {
		return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RoleGuard))
	}

	return applyDecorators(UseGuards(AuthGuard))
}
