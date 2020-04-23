import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { CategoryService } from "src/app/allservice/category.service";
import { Category } from "src/app/model/category";
import { Subject } from "rxjs";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"],
})
export class CategoryComponent implements OnInit {
  @ViewChild("f") addForm: NgForm;
  message: string;
  editMode: boolean = false;
  categoryId: number;

  private categories: Category[];

  constructor(private service: CategoryService) {}

  ngOnInit() {
    this.service.fetchCategories();
    this.service.changedCategories.subscribe((data) => {
      this.categories = data;
      console.log(this.categories);
    });
  }

  addCategory() {
    if (this.editMode) {
      this.service
        .updateCategory(this.categoryId, this.addForm.value)
        .subscribe(
          (response) => {
            console.log(response);
            this.service.fetchCategories();
            this.message = "Category Updated!";
            this.editMode = false;
            this.addForm.reset();
          },
          (err) => {
            console.log(err);
            this.message = err.error.message;
            this.editMode = false;
          }
        );
    } else {
      this.service.addCategory(this.addForm.value).subscribe(
        (response) => {
          console.log(response);
          this.service.fetchCategories();
          this.editMode = false;
          this.addForm.reset();
        },
        (err) => {
          console.log(err);
          this.message = err.error.message;
          this.editMode = false;
        }
      );
    }
  }

  onEdit(category: Category) {
    this.editMode = true;
    this.categoryId = category.categoryId;
    this.addForm.setValue({
      categoryName: category.categoryName,
    });
  }

  onDelete(id: number) {
    if (confirm("Are you sure! you want to delete category.")) {
      this.service.deleteCategory(id).subscribe((response) => {
        console.log(response);
        this.service.fetchCategories();
      });
    }
  }
}
