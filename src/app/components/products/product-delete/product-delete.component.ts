import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from './../product.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  public product!: Product;
  
  
  constructor(
    private _productService: ProductService,
    private _router: Router,
    // private _route: ActivatedRoute
    ) { }
    
    ngOnInit(): void {
    this._productService.readById(1).subscribe(product => {
      this.product = product
    })
  }

  deleteProduct(): void {
    //  this._productService.delete(this.product.id ).subscribe(() => {
    //    this._router.navigate(['/products'])
    //  });

  }

  cancel(): void {
    this._router.navigate(['/products'])
  }

}
