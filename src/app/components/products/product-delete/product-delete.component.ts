import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from './../product.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  public form!: FormGroup;
  public product!: Product;


  constructor(
    private _formBuilder: FormBuilder,
    private _productService: ProductService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._createForm(this.product)
    this._getProduct()
  }

  public deleteProduct(): void {
    this._productService.delete(this.product.id).subscribe(() => {
      this.cancel()
    });
  }

  public cancel(): void {
    this._router.navigate(['/products'])
  }

  /*************** METHODS PRIVATE ***************/

  private _createForm(product: Product): void {
    this.product = product
    this.form = this._formBuilder.group({
      id: [this.product ? this.product?.id : null],
      name: [this.product ? this.product?.name : null],
      price: [this.product ? this.product?.price : null]
    })

  }

  private _getProduct(): void {
    let id = this._route.snapshot.paramMap.get("id")
    this._productService.readById(Number(id)).subscribe(product => {
      this.product = product
      this._createForm(product)
      this.form.disable()
    })
  }
}
