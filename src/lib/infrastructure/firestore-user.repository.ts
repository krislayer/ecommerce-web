import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/client";
import type { IUserRepository } from "../domain/repositories/user.repository";
import type { AppUser, Address } from "../domain/entities/user";

export class FirestoreUserRepository implements IUserRepository {
  private checkDb() {
    if (!db) {
      throw new Error("Firebase is not initialized");
    }
    return db;
  }

  async findById(uid: string): Promise<AppUser | null> {
    const firestore = this.checkDb();
    const docRef = doc(firestore, "users", uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    return { uid: docSnap.id, ...docSnap.data() } as AppUser;
  }

  async create(user: Omit<AppUser, "createdAt" | "updatedAt">): Promise<AppUser> {
    const firestore = this.checkDb();
    const docRef = doc(firestore, "users", user.uid);
    await setDoc(docRef, {
      ...user,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return user as AppUser;
  }

  async update(uid: string, data: Partial<AppUser>): Promise<void> {
    const firestore = this.checkDb();
    const docRef = doc(firestore, "users", uid);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  }

  async addToWishlist(uid: string, productId: string): Promise<void> {
    const firestore = this.checkDb();
    const docRef = doc(firestore, "users", uid);
    await updateDoc(docRef, {
      wishlist: arrayUnion(productId),
      updatedAt: serverTimestamp(),
    });
  }

  async removeFromWishlist(uid: string, productId: string): Promise<void> {
    const firestore = this.checkDb();
    const docRef = doc(firestore, "users", uid);
    await updateDoc(docRef, {
      wishlist: arrayRemove(productId),
      updatedAt: serverTimestamp(),
    });
  }

  async addAddress(uid: string, address: Address): Promise<void> {
    const firestore = this.checkDb();
    const docRef = doc(firestore, "users", uid);
    const user = await this.findById(uid);
    
    if (!user) throw new Error("User not found");

    const addresses = user.addresses || [];
    addresses.push(address);

    await updateDoc(docRef, {
      addresses,
      updatedAt: serverTimestamp(),
    });
  }

  async updateAddress(
    uid: string,
    addressId: string,
    address: Partial<Address>
  ): Promise<void> {
    const firestore = this.checkDb();
    const docRef = doc(firestore, "users", uid);
    const user = await this.findById(uid);

    if (!user) throw new Error("User not found");

    const addresses = user.addresses.map((addr) =>
      addr.id === addressId ? { ...addr, ...address } : addr
    );

    await updateDoc(docRef, {
      addresses,
      updatedAt: serverTimestamp(),
    });
  }
}

