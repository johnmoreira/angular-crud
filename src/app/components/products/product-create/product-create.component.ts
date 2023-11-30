import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { CurrencyPipe } from '@angular/common';

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
    private _currencyPipe: CurrencyPipe,
    private _alertService: AlertModalService
  ) {

  }
  ngOnInit(): void {
    this._createForm(this.product)
  }

  public onSubmit() {
    if(this.form.invalid){
      return
    }

    this._productService.create(this.form.value).subscribe(() => {
      // console.log(`salvou ${this.form.value}`)
      this._alertService.showNotification('Alerta', 'Cadastrado com sucesso');
      this._router.navigate(['/products'])
    })
  }

  public reset(): void {
    this.form.reset();
  }

  get name() {
    return this.form.get('name')!;
  }

  get price() {
    return this.form.get('price')!;
  }

/*************** METHODS PRIVATE ***************/

  private _createForm(product: Product): void {
    this.product = product
    this.form = this._formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      price: ['', Validators.required]
    })

    this.form.valueChanges.subscribe(form =>{
      if(form.price) {
        console.log('mudou')
        this.form.patchValue({
          //price: this._currencyPipe.transform(form.price.replace(/\D/g, '').replace(/^0+/, ''), 'BRL', 'symbol', '1.0-0')
          }, {emitEvent: false});
      }
    });
  }
}