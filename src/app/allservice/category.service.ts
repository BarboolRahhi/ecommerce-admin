import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Category } from "../model/category";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private baseUrl = "http://localhost:8083/category/";
  changedCategories = new Subject<Category[]>();

  constructor(private http: HttpClient) {}

  fetchCategories() {
    this.http.get<Category[]>(this.baseUrl + "all").subscribe((data) => {
      this.changedCategories.next(data);
    });
  }

  addCategory(category: Category) {
    return this.http.post(this.baseUrl + "add", category);
  }

  updateCategory(id: number, category: Category) {
    return this.http.put(this.baseUrl + `update/${id}`, category);
  }

  deleteCategory(id: number) {
    return this.http.delete(this.baseUrl + `delete/${id}`, {
      responseType: "text",
    });
  }
}
