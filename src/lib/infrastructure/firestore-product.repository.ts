import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  limit,
} from "firebase/firestore";
import { db } from "../firebase/client";
import type {
  IProductRepository,
  ICategoryRepository,
} from "../domain/repositories/product.repository";
import type {
  Product,
  ProductVariant,
  ProductSummary,
  Category,
} from "../domain/entities/product";

export class FirestoreProductRepository implements IProductRepository {
  async findById(id: string): Promise<Product | null> {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) return null;
    
    return { id: docSnap.id, ...docSnap.data() } as Product;
  }

  async findByCategory(categoryId: string): Promise<Product[]> {
    const q = query(
      collection(db, "products"),
      where("categoryIds", "array-contains", categoryId),
      where("active", "==", true),
      limit(50)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Product)
    );
  }

  async search(searchQuery: string): Promise<Product[]> {
    // Simple implementation - Firebase doesn't have full-text search
    // In production, use Algolia or similar
    const q = query(
      collection(db, "products"),
      where("active", "==", true),
      limit(50)
    );
    
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Product)
    );
    
    const lowerQuery = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
    );
  }

  async getSummariesByCategory(categoryId: string): Promise<ProductSummary[]> {
    // Use cache collection for better performance
    const docRef = doc(db, "catalog_summaries", categoryId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data().summaries as ProductSummary[];
    }
    
    // Fallback to products collection
    const products = await this.findByCategory(categoryId);
    return products.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.images[0] || "",
      categoryIds: p.categoryIds,
    }));
  }

  async getVariants(productId: string): Promise<ProductVariant[]> {
    const docRef = doc(db, "product_variants_compact", productId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) return [];
    
    return docSnap.data().variants as ProductVariant[];
  }
}

export class FirestoreCategoryRepository implements ICategoryRepository {
  async findAll(): Promise<Category[]> {
    const q = query(collection(db, "categories"));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Category)
    );
  }

  async findById(id: string): Promise<Category | null> {
    const docRef = doc(db, "categories", id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) return null;
    
    return { id: docSnap.id, ...docSnap.data() } as Category;
  }

  async findBySlug(slug: string): Promise<Category | null> {
    const q = query(
      collection(db, "categories"),
      where("slug", "==", slug),
      limit(1)
    );
    
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as Category;
  }
}

