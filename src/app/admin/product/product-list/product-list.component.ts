import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/model/product";
import { Router, ActivatedRoute } from "@angular/router";
import { ProductService } from "src/app/allservice/product.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  search: string;
  type: string;
  searchMode: boolean = false;
  retailerSearchMode: Boolean = false;

  //----------alert field-------------
  private isAlert: boolean = false;
  private alertMsg: string = "Alert Message";
  private alertHeading: string = "Error !";
  private alertTyp: string = "danger";
  //-----------end-----------------

  constructor(
    private service: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((param) => {
      let rid = +param["retailerId"];

      this.retailerSearchMode = param["retailerId"] != null;

      if (this.retailerSearchMode) {
        this.service.viewByRetailerId(rid).subscribe(
          (data) => {
            this.products = data;
            this.showAlert(
              true,
              "All Products of retailer Id: " + rid,
              "success",
              "Success!"
            );
          },
          (err) => {
            this.showAlert(true, err.error.message);
          }
        );
      }
    });
    this.route.params.subscribe((param) => {
      this.showAlert();
      this.search = param["query"];
      //set products array to empty if user click on search icon again
      if (this.type == param["type"]) {
        this.products = [];
      }
      this.type = param["type"];
      // setting search Mode
      this.searchMode = param["type"] != null;

      // get product by id
      if (this.type == "id") {
        this.service.viewById(+this.search).subscribe(
          (data) => {
            if (data != null) this.products.push(data);
          },
          (err) => {
            this.showAlert(true, err.error.message, "danger", "Error!");
          }
        );
      } else if (this.type == "name") {
        this.service.viewByName(this.search).subscribe(
          (data) => {
            this.products = data;
          },
          (err) => {
            this.showAlert(true, err.error.message);
          }
        );
      }
    });
    console.log(this.searchMode);

    if (!this.searchMode && !this.retailerSearchMode) {
      console.log("all data");
      this.service.fetchProducts();
      this.service.changedProduct.subscribe((data) => {
        this.products = data;
      });
    }
  }

  onView(id: number) {
    this.router.navigate(["../details", id], { relativeTo: this.route });
  }

  onEdit(id: number) {
    this.router.navigate(["../edit", id], { relativeTo: this.route });
  }

  onDelete(id: number) {
    if (confirm("Are you sure! you want to delete product")) {
      this.service.deleteProduct(id).subscribe(
        (response) => {
          console.log(response);
          alert(response);
          this.service.fetchProducts();
        },
        (err) => {
          console.log(err);
          if (err.status == 500)
            this.showAlert(true, "Product can't be delete");
        }
      );
    }
  }
  // showAlert() {
  //   this.message = null;
  // }

  showAlert(
    isAlert: boolean = false,
    alertMsg: string = "",
    alertTyp: string = "danger",
    alertHeading: string = "Error !"
  ) {
    // set
    this.alertMsg = alertMsg;
    this.isAlert = isAlert;
    this.alertTyp = alertTyp;
    this.alertHeading = alertHeading;
  }
}
