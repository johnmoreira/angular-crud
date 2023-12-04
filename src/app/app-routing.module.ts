import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './view/home/home.component';
import { ProductCrudComponent } from './view/product-crud/product-crud.component';
import { ProductDeleteComponent } from './components/products/product-delete/product-delete.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  }, {
    path: "products",
    component: ProductCrudComponent
  }, {
    path: "products/delete/:id",
    component: ProductDeleteComponent
  }, {
    path: "products/create",
    component: ProductFormComponent
  }, {
    path: "products/update/:id",
    component: ProductFormComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
