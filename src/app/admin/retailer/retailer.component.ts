import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-retailer",
  templateUrl: "./retailer.component.html",
  styleUrls: ["./retailer.component.css"],
})
export class RetailerComponent implements OnInit {
  search: string;
  type: string;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}

  onSerach() {
    this.router.navigate(["search", this.type, this.search], {
      relativeTo: this.route,
    });
  }
}
