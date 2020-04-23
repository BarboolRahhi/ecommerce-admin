import { Injectable } from "@angular/core";
import { Product } from "../model/product";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject } from "rxjs";
import { ProductSpec } from "../model/productspec";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private baseUrl = "http://localhost:8083/product/";

  changedProduct = new Subject<Product[]>();

  constructor(private http: HttpClient) {}

  fetchProducts() {
    this.http.get<Product[]>(this.baseUrl + "all").subscribe((data) => {
      this.changedProduct.next(data);
    });
  }

  viewById(id: number) {
    return this.http.get<Product>(this.baseUrl + `getById/${id}`);
  }

  viewByName(name: string) {
    return this.http.get<Product[]>(this.baseUrl + `getByName/${name}`);
  }

  viewByRetailerId(id: number) {
    let params = new HttpParams().set("retailerId", id.toString());
    return this.http.get<Product[]>(this.baseUrl, { params: params });
  }

  addProduct(product: Product) {
    return this.http.post(this.baseUrl + "add", product);
  }

  addProductSpecs(productSpecs: ProductSpec[]) {
    return this.http.post(this.baseUrl + "spec/add", productSpecs);
  }

  updateProduct(id: number, product: Product) {
    return this.http.put(this.baseUrl + `update/${id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(this.baseUrl + `delete/${id}`, {
      responseType: "text",
    });
  }
}
