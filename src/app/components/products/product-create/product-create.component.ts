import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  public form!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _productService: ProductService,
  ) {

  }

  ngOnInit(): void {
    this._criarFormulario()
  }

  private _criarFormulario(): void {
    this.form = this._formBuilder.group({
      name: [null],
      price: [null]
    })
  }

  onSubmit() {
    this._productService.create(this.form.value).subscribe(() => {
      console.log(this.form.value)
      this.form.reset();
    })
  }

  public reset(): void {
    this.form.reset();
  }
}