import { Component, OnInit, ViewChild } from "@angular/core";
import { Retailer } from "src/app/model/retailer";
import { RetailerService } from "src/app/allservice/retailer.service";
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-retailer-edit",
  templateUrl: "./retailer-edit.component.html",
  styleUrls: ["./retailer-edit.component.css"],
})
export class RetailerEditComponent implements OnInit {
  @ViewChild("f") addForm: NgForm;
  retailer: Retailer;
  errorMsg: string;
  successMsg: string;
  retailerId: number;
  editMode: boolean = false;

  constructor(
    private service: RetailerService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activateRoute.params.subscribe((param) => {
      this.retailerId = +param["id"];
      this.editMode = param["id"] != null;
      console.log(this.retailerId);
      this.setRetailer();
    });
  }

  addRetailer() {
    if (this.editMode) {
      this.service
        .updateRetailer(this.retailerId, this.addForm.value)
        .subscribe(
          (data) => {
            console.log(data);
            if (data != null)
              this.successMsg = "Retailer SuccessFully Updated!";
            this.addForm.reset();
            this.editMode = false;
          },
          (err) => {
            this.errorMsg = err.error.message;
          }
        );
    } else {
      this.service.addRetailer(this.addForm.value).subscribe(
        (data) => {
          console.log(data);
          if (data != null) this.successMsg = "Retailer SuccessFully Added!";
          this.addForm.reset();
        },
        (err) => {
          this.errorMsg = err.error.message;
        }
      );
    }
  }

  setRetailer() {
    if (this.editMode) {
      this.service.viewById(this.retailerId).subscribe(
        (data) => {
          this.addForm.setValue(data);
        },
        (err) => {
          this.errorMsg = err.error.message;
        }
      );
    }
  }
}
