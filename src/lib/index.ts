// Domain exports
export * from "./domain/entities/product";
export * from "./domain/entities/order";
export * from "./domain/entities/user";

// Repository interfaces
export * from "./domain/repositories/product.repository";
export * from "./domain/repositories/order.repository";
export * from "./domain/repositories/user.repository";

// Services
export * from "./domain/services/shipping-strategy";
export * from "./domain/services/discount-strategy";
export * from "./domain/services/whatsapp-factory";
export * from "./services/order.service";

// Implementations
export * from "./infrastructure/firestore-product.repository";
export * from "./infrastructure/firestore-order.repository";
export * from "./infrastructure/firestore-user.repository";

// Utils
export * from "./utils/formatters";
export * from "./utils/validators";

