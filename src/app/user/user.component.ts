import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "../admin/service/auth.service";
import { User } from "src/app/model/user";
import * as jwt_decode from "jwt-decode";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  @ViewChild("f") logInForm: NgForm;
  error: string;

  constructor(private service: AuthService, private router: Router) {}

  ngOnInit() {}

  login() {
    console.log(this.logInForm.value);
    const user = new User("rahhi7@g.com", "123456");
    this.service.login(this.logInForm.value).subscribe(
      (res) => {
        console.log(res.status);
        this.router.navigateByUrl("admin");
      },
      (err) => {
        console.log(err.status);
        if (err.status === 401) this.error = "You are Unauthorized";
      }
    );
  }
}
