export interface AppUser {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  wishlist: string[];
  addresses: Address[];
  createdAt: number;
  updatedAt: number;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  zone: string;
  postalCode?: string;
  notes?: string;
  isDefault: boolean;
}

