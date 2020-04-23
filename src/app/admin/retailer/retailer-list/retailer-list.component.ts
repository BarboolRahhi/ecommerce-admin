import { Component, OnInit } from "@angular/core";
import { Retailer } from "src/app/model/retailer";
import { RetailerService } from "src/app/allservice/retailer.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-retailer-list",
  templateUrl: "./retailer-list.component.html",
  styleUrls: ["./retailer-list.component.css"],
})
export class RetailerListComponent implements OnInit {
  private retailers: Retailer[] = [];
  search: string;
  type: string;
  searchMode: boolean = false;

  //----------alert field-------------
  private isAlert: boolean = false;
  private alertMsg: string = "Alert Message";
  private alertHeading: string = "Error !";
  private alertTyp: string = "danger";
  //-----------end-----------------

  constructor(
    private retailerService: RetailerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.showAlert();
      this.search = param["query"];
      if (this.type == param["type"]) {
        this.retailers = [];
      }
      this.type = param["type"];
      this.searchMode = param["type"] != null;

      if (this.type == "id") {
        this.retailerService.viewById(+this.search).subscribe(
          (data) => {
            if (data != null) this.retailers.push(data);
          },
          (err) => {
            this.showAlert(true, err.error.message, "danger", "Error!");
          }
        );
      } else if (this.type == "name") {
        this.retailerService.viewByName(this.search).subscribe(
          (data) => {
            this.retailers = data;
          },
          (err) => {
            this.showAlert(true, err.error.message);
          }
        );
      }
    });
    if (!this.searchMode) {
      this.retailerService.fetchRetailers();
      this.retailerService.changedRetailer.subscribe(
        (data) => (this.retailers = data)
      );
    }
  }

  onView(id: number) {
    this.router.navigate(["admin/product/list"], {
      queryParams: { retailerId: id },
    });
  }

  onEdit(id: number) {
    this.router.navigate(["../edit", id], { relativeTo: this.route });
  }

  onDelete(id: number) {
    if (confirm("Are you sure! you want to delete retailer.")) {
      this.retailerService.deleteRetailer(id).subscribe(
        (response) => {
          console.log(response);
          alert(response);
          this.retailerService.fetchRetailers();
        },
        (err) => {
          console.log(err);
          if (err.status == 500)
            this.showAlert(
              true,
              "Retailer can't be delete because products are available."
            );
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
