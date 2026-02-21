import { UserRole } from "../data/types";

// Role hierarchy: user < mod < tester < admin
const ROLE_LEVEL: Record<UserRole, number> = {
  user: 0,
  mod: 1,
  tester: 2,
  admin: 3,
};

/** Check if role meets minimum level */
export function hasRole(role: UserRole | undefined, minRole: UserRole): boolean {
  return ROLE_LEVEL[role || "user"] >= ROLE_LEVEL[minRole];
}

/** Can moderate content (approve/reject/hide listings & posts) */
export function canModerate(role: UserRole | undefined): boolean {
  return hasRole(role, "mod");
}

/** Can bypass moderation (posts go straight to active) */
export function canBypassModeration(role: UserRole | undefined): boolean {
  return hasRole(role, "tester");
}

/** Can access admin dashboard */
export function canAccessAdmin(role: UserRole | undefined): boolean {
  return hasRole(role, "mod");
}

/** Can manage users and assign roles (admin only) */
export function canManageRoles(role: UserRole | undefined): boolean {
  return hasRole(role, "admin");
}
