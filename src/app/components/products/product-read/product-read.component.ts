import { ProductService } from './../product.service';
import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent  implements OnInit {
  public page = 1;
  public pageSize = 10;

  products: Product[] = []

  constructor(private productService: ProductService, private _router: Router) {
  }

  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.products = products
    })
  }

  public onEdit(product: Product) {
    return this._router.navigate(['/products/update/', product.id]);
  }

  public onDelete(product: Product) {
    return this._router.navigate(['/products/delete/', product.id]);
  }
}