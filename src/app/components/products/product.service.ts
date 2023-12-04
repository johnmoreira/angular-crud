import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { Product } from './product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products"

  constructor(private http: HttpClient) { }

  showMessage(msg: string): void { }

  public save(record: Product) {
    if (record.id) {
      return this._update(record);
    }
    return this._create(record);
  }

  public read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  public readById(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Product>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  public delete(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  /************** METHODS PRIVATE **************/
  private _update(Product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${Product.id}`
    return this.http.put<Product>(url, Product).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }
  private _create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  private errorHandler(e: any): Observable<any> {
    return EMPTY;
  }
}
