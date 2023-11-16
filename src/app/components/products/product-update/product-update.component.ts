import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  public form!: FormGroup;

  constructor(
    private _productService: ProductService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id')
    // this._productService.readById(id).subscribe(product => {
    // });
    this._updateProduct();
  }
  
  public onSubmit(): void{}
  
  public cancel(): void {
    this._router.navigate(['/products'])
  }
  
  /*************** METHODS PRIVATE ***************/
  
  private _updateProduct(): void {}

}