export interface UserRole {
  userId: number;
  roleId: number;
}

export interface RolePermission {
  roleId: number;
  permissionId: number;
}

export interface RoleMenu {
  roleId: number;
  menuId: number;
}
