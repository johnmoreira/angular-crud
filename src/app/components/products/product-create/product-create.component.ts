
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  public form!: FormGroup;
  public product!: Product;
  
  constructor(
    private _formBuilder: FormBuilder,
    private _productService: ProductService,
    private _router: Router,
  ) {

  }

  ngOnInit(): void {
    this._criarFormulario(this.product)
  }

  public onSubmit() {
    this._productService.create(this.form.value).subscribe(() => {
      console.log(this.form.value)
      this._router.navigate(['/products'])
      this.reset
    })
  }

  public reset(): void {
    this.form.reset();
  }


/*************** METHODS PRIVATE ***************/

  private _criarFormulario(product: Product): void {
    this.product = product
    this.form = this._formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      price: [null, Validators.required]
    })
  }
}