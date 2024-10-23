import { UserRole } from 'src/enum/userRole';
import { StylesBranding } from 'src/enum';

export type FilterType = { label: string; value: string };

export const filterUsers: FilterType[] = [
  { label: 'Filter', value: 'id' },
  { label: 'Email', value: 'email' },
  { label: 'First Name', value: 'firstName' },
  { label: 'Last Name', value: 'lastName' },
  { label: 'Last Activity', value: 'lastActivity' },
];
export const filterUsersRole: FilterType[] = [
  { label: 'All', value: '' },
  { label: 'User', value: UserRole.USER },
  { label: 'Admin', value: UserRole.ADMIN },
];

export const chooseRoleSelector: FilterType[] = [
  { label: 'User', value: UserRole.USER },
  { label: 'Admin', value: UserRole.ADMIN },
];

export const chooseColorTypeSelector: FilterType[] = [
  { label: 'Gradient', value: StylesBranding.GRADIENT },
  { label: 'Solid', value: StylesBranding.SOLID },
];
