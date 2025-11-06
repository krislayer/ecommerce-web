#!/usr/bin/env node

/**
 * Seed script para poblar Firestore con datos iniciales
 * Uso: node src/scripts/seed-firebase.cjs
 */

const admin = require("firebase-admin");
const path = require("path");

// Initialize Firebase Admin
const serviceAccount = require("../../firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Seed Categories
async function seedCategories() {
  console.log("🌱 Seeding categories...");
  
  const categories = [
    {
      id: "woman",
      name: "Mujer",
      slug: "mujer",
      description: "Moda femenina para todos los días",
      facetDefs: [
        {
          key: "size",
          type: "enum",
          values: ["XS", "S", "M", "L", "XL"],
          widget: "swatch",
        },
        {
          key: "color",
          type: "enum",
          values: ["Negro", "Blanco", "Rojo", "Azul", "Rosa"],
          widget: "swatch",
        },
        {
          key: "precio",
          type: "range",
        },
      ],
    },
  ];

  for (const category of categories) {
    await db.collection("categories").doc(category.id).set(category);
    console.log(`  ✓ Created category: ${category.name}`);
  }
}

// Seed Products
async function seedProducts() {
  console.log("🌱 Seeding products...");
  
  const products = [
    {
      id: "camiseta-basica-negra",
      name: "Camiseta Básica Negra",
      description: "Camiseta básica de algodón, perfecta para combinar",
      price: 150,
      categoryIds: ["woman"],
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
      ],
      attrs: {
        size: "M",
        color: "Negro",
        material: "Algodón",
      },
      facets: [
        "size:M",
        "color:Negro",
        "material:Algodón",
        "precio:100-199",
      ],
      active: true,
      condition: "new",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: "vestido-festonero",
      name: "Vestido Festonero Blanco",
      description: "Vestido elegante con detalles festoneros",
      price: 350,
      categoryIds: ["woman"],
      images: [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
      ],
      attrs: {
        size: "M",
        color: "Blanco",
        material: "Algodón",
      },
      facets: [
        "size:M",
        "color:Blanco",
        "material:Algodón",
        "precio:300-399",
      ],
      active: true,
      condition: "used",
      conditionRating: 9.5,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ];

  for (const product of products) {
    await db.collection("products").doc(product.id).set(product);
    console.log(`  ✓ Created product: ${product.name}`);
  }
}

// Seed Product Variants
async function seedVariants() {
  console.log("🌱 Seeding product variants...");
  
  const variants = [
    {
      productId: "camiseta-basica-negra",
      variants: [
        {
          id: "var-1",
          productId: "camiseta-basica-negra",
          attributes: { size: "S", color: "Negro" },
          price: 150,
          stock: 10,
          sku: "TSH-BLK-S",
        },
        {
          id: "var-2",
          productId: "camiseta-basica-negra",
          attributes: { size: "M", color: "Negro" },
          price: 150,
          stock: 15,
          sku: "TSH-BLK-M",
        },
        {
          id: "var-3",
          productId: "camiseta-basica-negra",
          attributes: { size: "L", color: "Negro" },
          price: 150,
          stock: 8,
          sku: "TSH-BLK-L",
        },
      ],
    },
  ];

  for (const { productId, variants } of variants) {
    await db
      .collection("product_variants_compact")
      .doc(productId)
      .set({ variants });
    console.log(`  ✓ Created variants for: ${productId}`);
  }
}

// Seed Settings
async function seedSettings() {
  console.log("🌱 Seeding settings...");
  
  const settings = {
    whatsappNumber: "50250123456",
    storeAddress: "Ciudad de Guatemala, Zona 10",
    shippingCost: 50,
    minimumOrder: 100,
  };

  await db.collection("settings").doc("app").set(settings);
  console.log("  ✓ Created app settings");
}

// Main
async function main() {
  try {
    console.log("🚀 Starting seed process...\n");
    
    await seedCategories();
    await seedProducts();
    await seedVariants();
    await seedSettings();
    
    console.log("\n✅ Seed completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during seed:", error);
    process.exit(1);
  }
}

main();

