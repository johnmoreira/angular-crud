import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from './../product.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { EMPTY, switchMap, take } from 'rxjs';

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

  public deleteProduct(): void {
    const result = this._alertService.showConfirm('Confirmação', 'tem certeza que deseja remover esse produto?', 'Sim');
    // console.log(result$);
    // result$
    // // result$.asObservable()
    // .pipe(
    //   take(1),
    //   switchMap(result => result ? this._productService.delete(this.product.id): EMPTY )
    // )
    // .subscribe(() => console.log('removido com sucesso!'));

    result.then(
      (result) => {
        this._productService.delete(this.product.id)
      }
    )
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
