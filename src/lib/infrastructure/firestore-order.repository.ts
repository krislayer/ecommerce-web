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
  Timestamp,
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
    
    try {
      // Preparar el documento para Firestore
      const orderData = {
        ...order,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      
      const docRef = await addDoc(collection(firestore, "orders"), orderData);

      // Leer el documento creado después de un pequeño delay para asegurar que los timestamps estén disponibles
      // En algunos casos, serverTimestamp() puede no estar disponible inmediatamente
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const createdDoc = await getDoc(docRef);
      
      if (!createdDoc.exists()) {
        throw new Error("No se pudo crear el pedido en Firestore");
      }

      const data = createdDoc.data();
      const now = Date.now();
      
      // Convertir los timestamps de Firestore a números (milisegundos)
      // Si es un Timestamp de Firestore, usar toMillis(), si no, usar el valor actual
      const createdAt = data.createdAt instanceof Timestamp 
        ? data.createdAt.toMillis() 
        : (data.createdAt?.toMillis?.() || now);
      
      const updatedAt = data.updatedAt instanceof Timestamp 
        ? data.updatedAt.toMillis() 
        : (data.updatedAt?.toMillis?.() || now);
      
      return {
        id: docRef.id,
        ...data,
        createdAt,
        updatedAt,
      } as Order;
    } catch (error) {
      console.error("Error en FirestoreOrderRepository.create:", error);
      throw new Error(`Error al crear el pedido: ${error instanceof Error ? error.message : "Error desconocido"}`);
    }
  }

  async findById(id: string): Promise<Order | null> {
    const firestore = this.checkDb();
    const docRef = doc(firestore, "orders", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    const data = docSnap.data();
    
    // Convertir timestamps si es necesario
    const createdAt = data.createdAt instanceof Timestamp 
      ? data.createdAt.toMillis() 
      : (data.createdAt?.toMillis?.() || data.createdAt || Date.now());
    
    const updatedAt = data.updatedAt instanceof Timestamp 
      ? data.updatedAt.toMillis() 
      : (data.updatedAt?.toMillis?.() || data.updatedAt || Date.now());

    return { 
      id: docSnap.id, 
      ...data,
      createdAt,
      updatedAt,
    } as Order;
  }

  async findByUserId(userId: string): Promise<Order[]> {
    const firestore = this.checkDb();
    const q = query(
      collection(firestore, "orders"),
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const createdAt = data.createdAt instanceof Timestamp 
        ? data.createdAt.toMillis() 
        : (data.createdAt?.toMillis?.() || data.createdAt || Date.now());
      const updatedAt = data.updatedAt instanceof Timestamp 
        ? data.updatedAt.toMillis() 
        : (data.updatedAt?.toMillis?.() || data.updatedAt || Date.now());
      
      return { 
        id: doc.id, 
        ...data,
        createdAt,
        updatedAt,
      } as Order;
    });
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

