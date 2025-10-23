import type { AppUser, Address } from "../entities/user";

export interface IUserRepository {
  findById(uid: string): Promise<AppUser | null>;
  create(user: Omit<AppUser, "createdAt" | "updatedAt">): Promise<AppUser>;
  update(uid: string, data: Partial<AppUser>): Promise<void>;
  addToWishlist(uid: string, productId: string): Promise<void>;
  removeFromWishlist(uid: string, productId: string): Promise<void>;
  addAddress(uid: string, address: Address): Promise<void>;
  updateAddress(uid: string, addressId: string, address: Partial<Address>): Promise<void>;
}

