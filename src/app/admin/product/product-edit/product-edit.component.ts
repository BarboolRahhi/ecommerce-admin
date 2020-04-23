import { Component, OnInit, ViewChild } from "@angular/core";
import {
  NgForm,
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { CategoryService } from "src/app/allservice/category.service";
import { ProductService } from "src/app/allservice/product.service";
import { RetailerService } from "src/app/allservice/retailer.service";
import { Category } from "src/app/model/category";
import { Retailer } from "src/app/model/retailer";
import { Product } from "src/app/model/product";
import { ActivatedRoute } from "@angular/router";
import { ProductSpec } from "src/app/model/productspec";

@Component({
  selector: "app-product-edit",
  templateUrl: "./product-edit.component.html",
  styleUrls: ["./product-edit.component.css"],
})
export class ProductEditComponent implements OnInit {
  private productForm: FormGroup;
  private categories: Category[];
  private retailers: Retailer[];
  private pid: number;

  // edit mode for add new product or update product
  editMode: boolean = false;

  //loading field
  isLoading: boolean = false;

  //----------alert field-------------
  private isAlert: boolean = false;
  private alertMsg: string = "Alert Message";
  private alertHeading: string = "Error !";
  private alertTyp: string = "danger";
  //-----------end-----------------

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private retailerService: RetailerService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.categoryService.fetchCategories();
    this.categoryService.changedCategories.subscribe((data) => {
      this.categories = data;
    });

    this.retailerService.fetchRetailers();
    this.retailerService.changedRetailer.subscribe(
      (data) => (this.retailers = data)
    );

    this.activateRoute.params.subscribe((param) => {
      this.pid = +param["id"];
      this.editMode = param["id"] != null;
      this.initForm();
      this.setEditInitValue();
    });
  }

  onSpecAdd() {
    (<FormArray>this.productForm.get("productSpec")).push(
      this.fb.group({
        name: [null, Validators.required],
        value: [null, Validators.required],
      })
    );
  }

  onSpecRemove(index: number) {
    (<FormArray>this.productForm.get("productSpec")).removeAt(index);
  }

  addProduct() {
    this.isLoading = true;
    let category = this.categories.filter(
      (c) => c.categoryId == this.productForm.value["categoryId"]
    )[0];

    let retailer = this.retailers.filter(
      (r) => r.retailerId == this.productForm.value["retailerId"]
    )[0];

    let product = new Product(
      this.productForm.value["productId"],
      this.productForm.value["productName"],
      this.productForm.value["productInfo"],
      this.productForm.value["price"],
      this.productForm.value["brandName"],
      this.productForm.value["quantity"],
      category,
      retailer
    );

    let productSpec: ProductSpec[] = [];

    this.productSpecs.value.forEach(
      (pspec: { name: string; value: string }) => {
        const specId: string = this.productForm.value["productId"] + pspec.name;
        console.log(specId);
        let tempSpec = new ProductSpec(
          specId,
          pspec.name,
          pspec.value,
          product
        );
        productSpec.push(tempSpec);
        console.log(tempSpec.specId);
      }
    );

    console.log("productspec");
    console.log(productSpec);

    if (this.editMode) {
      this.productService.updateProduct(this.pid, product).subscribe(
        (response) => {
          if (response != null) {
            this.isLoading = false;
            this.showAlert(true, "Product Updated!", "success", "Success!");
            this.productForm.reset();
          }
        },
        (err) => {
          console.log(err.error.message);
          this.isLoading = false;
          this.showAlert(true, err.error.message);
        }
      );
    } else {
      this.productService.addProduct(product).subscribe(
        (response) => {
          if (response != null) {
            this.saveProductSpecification(productSpec);
          }
        },
        (err) => {
          console.log(err.error.message);
          this.isLoading = false;
          this.showAlert(true, err.error.message);
        }
      );
    }
  }

  /**
   * @param productSpec
   * this function is used for saving product specification.
   * it invoke after completion of addProduct because we need
   * product id to save specification
   */
  saveProductSpecification(productSpec: ProductSpec[]) {
    this.productService.addProductSpecs(productSpec).subscribe(
      (response) => {
        if (response != null) {
          this.isLoading = false;
          this.showAlert(true, "Product Added!", "success", "Success!");
          this.productForm.reset();
        }
      },
      (err) => {
        console.log(err.error.message);
        this.isLoading = false;
        this.showAlert(true, err.error.message);
      }
    );
  }

  /**
   * this funtion set initial value to product form when editmode is false
   * and initailize reactive form controls with validation
   */
  initForm() {
    this.productForm = this.fb.group({
      productId: [
        null,
        [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)],
      ],
      productName: ["", Validators.required],
      productInfo: ["", Validators.required],
      price: [
        null,
        [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)],
      ],
      brandName: ["", Validators.required],
      quantity: [
        "",
        [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)],
      ],
      imageUrl: ["", Validators.required],
      categoryId: [null, Validators.required],
      retailerId: [null, Validators.required],
      productSpec: new FormArray([]),
    });
  }

  /**
   * this function set edit value of product when editmode is true
   * it invoke when end point id edit/id
   * it get value from service and set into productForm
   */
  setEditInitValue() {
    if (this.editMode) {
      this.productService.viewById(this.pid).subscribe((p) => {
        this.productForm.patchValue({
          productId: p.productId,
          productName: p.productName,
          productInfo: p.productInfo,
          price: p.price,
          brandName: p.brandName,
          quantity: p.quantity,
          categoryId: p.category.categoryId,
          retailerId: p.inventory.retailerId,
        });
      });
    }
  }

  /**
   * this section for getting reference of form elements
   * this is done for error handling
   */
  private get productSpecs() {
    return <FormArray>this.productForm.get("productSpec");
  }

  private get productId() {
    return this.productForm.get("productId");
  }

  private get productName() {
    return this.productForm.get("productName");
  }

  private get productInfo() {
    return this.productForm.get("productInfo");
  }

  private get price() {
    return this.productForm.get("price");
  }

  private get brandName() {
    return this.productForm.get("brandName");
  }

  private get quantity() {
    return this.productForm.get("quantity");
  }

  private get imageUrl() {
    return this.productForm.get("imageUrl");
  }

  private get categoryId() {
    return this.productForm.get("categoryId");
  }

  private get retailerId() {
    return this.productForm.get("retailerId");
  }
  //-----------end----------------------

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
