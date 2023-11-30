import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { EMPTY } from 'rxjs';

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
    private _route: ActivatedRoute,
    private _alertService: AlertModalService
  ) { }

  ngOnInit(): void {
    this._createForm(this.product)
    this._getProduct()
  }

  public onDelete() {
    const res = this._alertService.showConfirm('Confirmação', 'tem certeza que deseja remover esse produto?', 'Sim');

    res.then(
      (result) => {
        if (result) {
         this._deleteProduct()
        }
        EMPTY;
      })

  }

  public onCancel(): void {
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

  private _deleteProduct(): void {
    this._productService.delete(this.product.id).subscribe(()=> this._router.navigate(['/products']));
  }
}
