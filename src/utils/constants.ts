import { UserRole } from 'src/enum/userRole';

export const UserRoleNames = {
  [UserRole.USER]: 'Standard',
  [UserRole.ADMIN]: 'App Admin',
  [UserRole.SUPERADMIN]: 'Super Admin',
};
