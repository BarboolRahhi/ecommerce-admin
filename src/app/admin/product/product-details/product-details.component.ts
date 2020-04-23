import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/model/product";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "src/app/allservice/product.service";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"],
})
export class ProductDetailsComponent implements OnInit {
  private product: Product;
  private pid: number;
  private isLoading = false;

  //----------alert field-------------
  private isAlert: boolean = false;
  private alertMsg: string = "Alert Message";
  private alertHeading: string = "Error !";
  private alertTyp: string = "danger";
  //-----------end-----------------

  constructor(
    private activateRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.activateRoute.params.subscribe((param) => {
      this.pid = +param["id"];
      this.setProductDetails(this.pid);
    });
  }

  setProductDetails(pid: number) {
    this.isLoading = true;
    this.productService.viewById(pid).subscribe(
      (product) => {
        this.product = product;
        this.isLoading = false;
      },
      (err) => {
        this.showAlert(true, err.error.message);
        this.isLoading = false;
      }
    );
  }

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
