import { Component, OnInit } from "@angular/core";
import { AuthService } from "./service/auth.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  constructor(private service: AuthService) {}
  ngOnInit(): void {}

  getPro() {
    this.service.getProduct();
  }
}
