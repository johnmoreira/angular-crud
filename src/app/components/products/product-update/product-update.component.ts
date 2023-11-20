import { Product } from './../product.model';
import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  public form!: FormGroup;
  public product!: Product;

  constructor(
    private _productService: ProductService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
  ) {

  }
  ngOnInit(): void {
    this._createForm(this.product)
    this._getProduct();
  }

  public updateProduct(): void {
    this._productService.update(this.form.value).subscribe(() => {
      this.cancel()
    })
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
    console.log(this.form.value)
  }

  private _getProduct(): void {
    let id = this._route.snapshot.paramMap.get("id")
    this._productService.readById(Number(id)).subscribe(product => {
      this.product = product
      this._createForm(this.product)
    });
  }
}