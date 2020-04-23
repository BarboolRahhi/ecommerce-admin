import { Category } from "./category";
import { Retailer } from "./retailer";

export class Product {
  productId: number;
  productName: string;
  productInfo: string;
  price: number;
  brandName: string;
  quantity: number;
  category: Category;
  inventory: Retailer;

  constructor(
    productId: number,
    productName: string,
    productInfo: string,
    price: number,
    brandName: string,
    quantity: number,
    category: Category,
    inventory: Retailer
  ) {
    this.productId = productId;
    this.productName = productName;
    this.productInfo = productInfo;
    this.price = price;
    this.brandName = brandName;
    this.quantity = quantity;
    this.category = category;
    this.inventory = inventory;
  }
}
