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
  product!: Product;

  constructor(
    private _productService: ProductService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
  ) {

  }
  ngOnInit(): void {
    this._updateProduct();
  }

  public onSubmit(): void {
    this._productService.update(this.form.value).subscribe(() => {
      this._router.navigate(["/products"])
    })
  }
  public cancel(): void {
    this._router.navigate(['/products'])
  }

  /*************** METHODS PRIVATE ***************/

  private _createForm(product: Product): void {
    this.product = product
    this.form = this._formBuilder.group({
      name: [this.product.name],
      price: [this.product.price]
    })
  }

  private _updateProduct(): void {
    let id = this._route.snapshot.paramMap.get("id")
    console.log(typeof (id), id)
    this._productService.readById(Number(id)).subscribe(product => {
      this.product = product
      console.log(product)
      this._createForm(this.product)
      console.log(this.form.get('name')?.value)
    });
  }
}