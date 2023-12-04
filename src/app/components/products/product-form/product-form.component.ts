import { ToastService } from './../../../shared/components/toasts/services/toast.service';
import { FormUtilsService } from './../../../shared/form-utils.service';
import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CurrencyPipe, Location } from '@angular/common';

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
    private _currencyPipe: CurrencyPipe,
    private _location: Location,
    public formUtils: FormUtilsService,
    private _toastService: ToastService
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

  // public onSubmit() {
  //   if (this.form.invalid) {
  //     return
  //   }
  //   this._productService.save(this.form.value).subscribe(() => {
  //   this._router.navitage(['/products'])
  //   })
  // }
  
  public onSubmit(): void {

    if (this.form.valid) {
      this._productService.save(this.form.value)
        .subscribe(
          () => this.onSuccess()
        )
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }
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

  public onSuccess(){
      this._toastService.show({title: 'Sucesso', message:'Produto cadastrado com sucesso', date: new Date()})
      this._router.navigate(['/products'])
    }

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
        Validators.minLength(1),
        Validators.maxLength(20),
        //Validators.pattern('^[0-9]*$'),
        Validators.pattern('[0-9]+(?:\\.[0-9]+)?')
      ]],
    });


    this.form.valueChanges.subscribe(form => {
      if (form.price) {
        console.log('mudou')
        this.form.patchValue({
          //transforma o valor para o formato corrento
          //price: this._currencyPipe.transform(form.price.replace(/\D/g, '').replace(/^0+/, ''), 'BRL', 'symbol', '1.0-0')
        }, { emitEvent: false });
      }
    });
  }
}