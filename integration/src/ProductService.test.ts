import { describe, it, expect, beforeEach } from "vitest";
import { DataStore } from "./DataStore";
import { ProductService } from "./ProductService";
import { IProduct, ProductCategory } from "./types";

describe("Test d'intégration ProductService", () => {
  let dataStore: DataStore;
  let service: ProductService;

  beforeEach(() => {
    dataStore = new DataStore();
    service = new ProductService(dataStore);
  });

  it("doit créer et récupérer un produit", () => {
    const productData = {
      name: "Salade",
      description: "Super salade",
      price: 5.99,
      category: "starter" as ProductCategory,
      available: true,
      preparationTimeMinutes: 5,
    };

    const created = service.createProduct(productData);
    expect(created.id).toBeDefined();
    expect(created.name).toBe(productData.name);

    const getProduct = service.getProduct(created.id);
    expect(getProduct).toEqual(created);
  });

  it("doit lister uniquement les produits disponibles", () => {
    const prod1 = service.createProduct({
      name: "Steak",
      description: "Super steak",
      price: 15,
      category: "main" as ProductCategory,
      available: true,
      preparationTimeMinutes: 20,
    });
    const prod2 = service.createProduct({
      name: "Vin",
      description: "Bon vin rouge",
      price: 8,
      category: "drink" as ProductCategory,
      available: false,
      preparationTimeMinutes: 0,
    });

    const available = service.getAvailableProducts();
    expect(available).toContainEqual(prod1);
    expect(available).not.toContainEqual(prod2);
  });

  it("doit récupérer les produits par catégorie", () => {
    const produitMain = service.createProduct({
      name: "Burger",
      description: "Super burger",
      price: 10,
      category: "main" as ProductCategory,
      available: true,
      preparationTimeMinutes: 10,
    });
    const produitDessert = service.createProduct({
      name: "Cake",
      description: "Chocolate cake",
      price: 4.5,
      category: "dessert" as ProductCategory,
      available: true,
      preparationTimeMinutes: 15,
    });

    const mains = service.getProductsByCategory("main");
    expect(mains).toEqual([produitMain]);

    const desserts = service.getProductsByCategory("dessert");
    expect(desserts).toEqual([produitDessert]);
  });
});
