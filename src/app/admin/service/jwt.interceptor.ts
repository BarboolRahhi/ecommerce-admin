import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let userInfo: { userId: number; token: string } = JSON.parse(
      localStorage.getItem("currentUser")
    );
    if (userInfo && userInfo.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
    }

    return next.handle(request);
  }
}
