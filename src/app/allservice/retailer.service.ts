import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Retailer } from "../model/retailer";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class RetailerService {
  private baseUrl = "http://localhost:8083/retailer/";

  changedRetailer = new Subject<Retailer[]>();

  constructor(private http: HttpClient) {}

  fetchRetailers() {
    this.http.get<Retailer[]>(this.baseUrl + "all").subscribe((data) => {
      this.changedRetailer.next(data);
    });
  }

  viewById(id: number) {
    return this.http.get<Retailer>(this.baseUrl + `getById/${id}`);
  }

  viewByName(name: string) {
    return this.http.get<Retailer[]>(this.baseUrl + `getByName/${name}`);
  }

  addRetailer(retailer: Retailer) {
    return this.http.post(this.baseUrl + "add", retailer);
  }

  updateRetailer(id: number, retailer: Retailer) {
    return this.http.put(this.baseUrl + `update/${id}`, retailer);
  }

  deleteRetailer(id: number) {
    return this.http.delete(this.baseUrl + `delete/${id}`, {
      responseType: "text",
    });
  }
}
