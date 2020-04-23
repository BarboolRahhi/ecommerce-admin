import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from "./user/user.component";
import { AdminComponent } from "./admin/admin.component";
import { AccessDeniedComponent } from "./access-denied/access-denied.component";
import { AuthorizationGuard } from "./admin/service/authorization.guard";
import { CategoryComponent } from "./admin/category/category.component";
import { RetailerComponent } from "./admin/retailer/retailer.component";
import { RetailerListComponent } from "./admin/retailer/retailer-list/retailer-list.component";
import { RetailerEditComponent } from "./admin/retailer/retailer-edit/retailer-edit.component";
import { ProductComponent } from "./admin/product/product.component";
import { ProductListComponent } from "./admin/product/product-list/product-list.component";
import { ProductEditComponent } from "./admin/product/product-edit/product-edit.component";
import { ProductDetailsComponent } from "./admin/product/product-details/product-details.component";

const routes: Routes = [
  { path: "", redirectTo: "admin", pathMatch: "full" },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthorizationGuard],
    data: {
      allowedRoles: "ROLE_ADMIN",
    },
    children: [
      { path: "category", component: CategoryComponent },
      {
        path: "retailer",
        component: RetailerComponent,
        children: [
          { path: "", redirectTo: "list", pathMatch: "full" },
          { path: "list", component: RetailerListComponent },
          { path: "add", component: RetailerEditComponent },
          { path: "edit/:id", component: RetailerEditComponent },
          { path: "search/:type/:query", component: RetailerListComponent },
        ],
      },
      {
        path: "product",
        component: ProductComponent,
        children: [
          { path: "", redirectTo: "list", pathMatch: "full" },
          { path: "list", component: ProductListComponent },
          { path: "details/:id", component: ProductDetailsComponent },
          { path: "add", component: ProductEditComponent },
          { path: "edit/:id", component: ProductEditComponent },
          { path: "search/:type/:query", component: ProductListComponent },
        ],
      },
    ],
  },
  {
    path: "login",
    component: UserComponent,
  },
  {
    path: "accessdenied",
    component: AccessDeniedComponent,
    data: {},
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
