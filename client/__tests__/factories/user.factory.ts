import { faker } from "@faker-js/faker";
import { User } from "@/lib/auth/models/User";
import { SerializedUser } from "@/lib/auth/types/auth.scema";
import { UserRole } from "@/lib/auth/types/auth.scema";
import mongoose from "mongoose";

interface UserFactoryOptions {
  isEmailVerified?: boolean;
  role?: UserRole;
  hasPrivateProfessionalPage?: boolean;
  acceptMarketing?: boolean;
  googleId?: string;
}

/**
 * Build a User object without saving to database
 */
export function buildUser(
  overrides?: Partial<SerializedUser> & UserFactoryOptions
): SerializedUser {
  const isEmailVerified = overrides?.isEmailVerified ?? faker.datatype.boolean();
  const role = overrides?.role ?? UserRole.User;

  return {
    id: overrides?.id ?? new mongoose.Types.ObjectId().toString(),
    firstName: overrides?.firstName ?? faker.person.firstName(),
    lastName: overrides?.lastName ?? faker.person.lastName(),
    email: overrides?.email ?? faker.internet.email(),
    isEmailVerified,
    createdAt: overrides?.createdAt ?? new Date().toISOString(),
    updatedAt: overrides?.updatedAt ?? new Date().toISOString(),
    hasPrivateProfessionalPage:
      overrides?.hasPrivateProfessionalPage ?? faker.datatype.boolean(),
    role,
    acceptMarketing: overrides?.acceptMarketing ?? faker.datatype.boolean(),
    ...(overrides?.googleId && { googleId: overrides.googleId }),
  };
}

/**
 * Create a User in the database
 */
export async function createUser(
  overrides?: Partial<SerializedUser> & UserFactoryOptions
): Promise<SerializedUser> {
  const userData = buildUser(overrides);
  const user = new User({
    ...userData,
    password: overrides?.password ?? faker.internet.password(),
  });
  await user.save();
  return JSON.parse(JSON.stringify(user)) as SerializedUser;
}

/**
 * Create multiple Users in the database
 */
export async function createManyUsers(
  count: number,
  overrides?: Partial<SerializedUser> & UserFactoryOptions
): Promise<SerializedUser[]> {
  const users: SerializedUser[] = [];
  for (let i = 0; i < count; i++) {
    const user = await createUser(overrides);
    users.push(user);
  }
  return users;
}

/**
 * Build multiple User objects without saving to database
 */
export function buildManyUsers(
  count: number,
  overrides?: Partial<SerializedUser> & UserFactoryOptions
): SerializedUser[] {
  return Array.from({ length: count }, () => buildUser(overrides));
}

export const UserFactory = {
  build: buildUser,
  buildMany: buildManyUsers,
  create: createUser,
  createMany: createManyUsers,
};
