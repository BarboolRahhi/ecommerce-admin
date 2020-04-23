import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./admin/header/header.component";
import { SideBarComponent } from "./admin/side-bar/side-bar.component";
import { CategoryComponent } from "./admin/category/category.component";
import { ProductComponent } from "./admin/product/product.component";
import { RetailerComponent } from "./admin/retailer/retailer.component";
import { UserComponent } from "./user/user.component";
import { AdminComponent } from "./admin/admin.component";
import { AccessDeniedComponent } from "./access-denied/access-denied.component";
import { JwtInterceptor } from "./admin/service/jwt.interceptor";
import { RetailerEditComponent } from "./admin/retailer/retailer-edit/retailer-edit.component";
import { RetailerListComponent } from "./admin/retailer/retailer-list/retailer-list.component";
import { ProductEditComponent } from "./admin/product/product-edit/product-edit.component";
import { ProductListComponent } from "./admin/product/product-list/product-list.component";
import { ProductDetailsComponent } from "./admin/product/product-details/product-details.component";
import { SpinnerComponent } from "./shared/spinner/spinner.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    CategoryComponent,
    ProductComponent,
    RetailerComponent,
    UserComponent,
    AdminComponent,
    AccessDeniedComponent,
    RetailerEditComponent,
    RetailerListComponent,
    ProductEditComponent,
    ProductListComponent,
    ProductDetailsComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
