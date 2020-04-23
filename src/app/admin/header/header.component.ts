import { Component, OnInit } from "@angular/core";
import { AuthService } from "../service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  userName: string;

  constructor(private service: AuthService, private router: Router) {}

  ngOnInit() {
    this.service
      .getUser()
      .subscribe((user: { firstName: string; lastName: string }) => {
        this.userName = user.firstName + " " + user.lastName;
      });
  }

  logOut() {
    this.service.logout();
    this.router.navigateByUrl("login");
  }
}
