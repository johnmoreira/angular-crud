import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  public form!: FormGroup;
  public product!: Product;

  constructor(
    private _formBuilder: FormBuilder,
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location,
  ) {
  }

  ngOnInit(): void {
    let id = this._route.snapshot.paramMap.get('id')
    if (id) {
      this._productService.readById(Number(id)).subscribe(product => {
        this.product = product;
        console.log(this.product);
        this.form.setValue({
          id: product.id,
          name: product.name,
          price: product.price
        })
      });
    }

    this._createForm(this.product);
  }

  public onSubmit() {
    if (this.form.invalid) {
      return
    }
    this._productService.save(this.form.value).subscribe(() => {
      this._router.navigate(['/products']);
    })
  }

  public onReset(): void {
    this.form.reset();
  }

  public onCancel(): void {
    this._location.back();
  }

  public get name() {
    return this.form.get('name')!;
  }

  public get price() {
    return this.form.get('price')!;
  }

  /*************** METHODS PRIVATE ***************/

  private _createForm(product: Product): void {
    this.product = product
    this.form = this._formBuilder.group({
      id: [this.product ? this.product.id : ''],
      name: [this.product ? this.product.name : '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]],

      price: [this.product ? this.product.price : '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]],
    });
  }
}