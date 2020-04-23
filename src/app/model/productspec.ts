import { Product } from "./product";

export class ProductSpec {
  specId: string;
  specName: string;
  specValue: string;
  product: Product;

  constructor(
    specId: string,
    specName: string,
    specValue: string,
    product: Product
  ) {
    this.specId = specId;
    this.specName = specName;
    this.specValue = specValue;
    this.product = product;
  }
}
