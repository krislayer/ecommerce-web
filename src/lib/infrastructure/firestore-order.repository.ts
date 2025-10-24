import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/client";
import type { IOrderRepository } from "../domain/repositories/order.repository";
import type { Order } from "../domain/entities/order";

export class FirestoreOrderRepository implements IOrderRepository {
  private checkDb() {
    if (!db) {
      throw new Error("Firebase is not initialized");
    }
    return db;
  }

  async create(
    order: Omit<Order, "id" | "createdAt" | "updatedAt">
  ): Promise<Order> {
    const firestore = this.checkDb();
    const docRef = await addDoc(collection(firestore, "orders"), {
      ...order,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    const createdDoc = await getDoc(docRef);
    return { id: docRef.id, ...createdDoc.data() } as Order;
  }

  async findById(id: string): Promise<Order | null> {
    const firestore = this.checkDb();
    const docRef = doc(firestore, "orders", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    return { id: docSnap.id, ...docSnap.data() } as Order;
  }

  async findByUserId(userId: string): Promise<Order[]> {
    const firestore = this.checkDb();
    const q = query(
      collection(firestore, "orders"),
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Order)
    );
  }

  async findByGuestPhone(phone: string): Promise<Order[]> {
    const firestore = this.checkDb();
    const q = query(
      collection(firestore, "orders"),
      where("guestInfo.phone", "==", phone)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Order)
    );
  }

  async updateStatus(id: string, status: Order["status"]): Promise<void> {
    const firestore = this.checkDb();
    const docRef = doc(firestore, "orders", id);
    await updateDoc(docRef, {
      status,
      updatedAt: serverTimestamp(),
    });
  }
}

