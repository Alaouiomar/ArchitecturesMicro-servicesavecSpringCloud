import {Injectable} from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {PageProduct, Product} from "../model/product.model";
import {ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private products!: Array<Product>;

  constructor() {
  }

  public getAllProducts(): Observable<Product[]> {
    let rnd = Math.random();
    if (rnd < 0.1) return throwError(() => new Error("Internet connexion error"));
    else return of([...this.products]);
  }

  public getPageProducts(page: number, size: number): Observable<PageProduct> {
    let index = page * size;
    let totalPages = ~~(this.products.length / size);
    if (this.products.length % size != 0)
      totalPages++;
    let pageProduct = this.products.slice(index, index + size);
    return of({page: page, size: size, totalPages: totalPages, products: pageProduct});
  }

  public deleteProduct(id: string) {
    this.products = this.products.filter(p => p.id != id);
    return of(true);
  }

  public setPromotion(id: string): Observable<boolean> {
    let product = this.products.find(p => p.id == id);
    if (product != undefined) {
      product.promotion = !product.promotion;
      return of(true);
    } else return throwError(() => new Error("Product not found"));
  }

  public searchProducts(keyword: string, page: number, size: number): Observable<PageProduct> {
    let result = this.products.filter(p => p.name.includes(keyword));
    let index = page * size;
    let totalPages = ~~(result.length / size);
    if (this.products.length % size != 0)
      totalPages++;
    let pageProduct = result.slice(index, index + size);
    return of({page: page, size: size, totalPages: totalPages, products: pageProduct});
  }

  public addNewProduct(product: Product): Observable<Product> {
    this.products.push(product);
    return of(product);
  }

  public getProduct(id :string):Observable<Product>{
    let product = this.products.find(p => p.id==id);
    if(product==undefined) return  throwError(()=> new Error("Product not found"));
    return of(product);
  }

  getErrorMessage(fieldName: string, error: ValidationErrors) {
    if (error['required']) {
      return fieldName + " is required";
    } else if (error['minLength']) {
      return fieldName + " should have at least " + error['minLength']['requiredLength'] + " Characters";
    } else if (error['min']) {
      return fieldName + " should have min value " + error['min']['min'];
    } else return "";
  }

  public updateProduct(product : Product): Observable<Product>{
    this.products=this.products.map(p=>(p.id==product.id)?product:p);
    return of(product);
  }

}
