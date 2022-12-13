import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PageProduct, Product} from "../model/product.model";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products : any;
  errorMessage!: string;
  searchFormGroup!: FormGroup;
  currentAction : string="all";

  constructor(private http: HttpClient,private fb: FormBuilder,private router : Router) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(null)
    });
    this.http.get("http://localhost:8888/PRODUCT-SERVICE/products").subscribe({
      next : (data) =>{
        this.products=data;
      },
      error : (err) =>{}
    });
  }




  handleSetPromotion(p: Product) {
    let promo = p.promotion;
    this.products.setPromotion(p.id).subscribe({
      next : () => {
        p.promotion = !promo;
      },
    })
  }

  handleNewProduct() {
    this.router.navigateByUrl("/newProduct");
  }
  handleEditProduct(p: any) {
    this.router.navigateByUrl("/edit-product/"+ p.id)
  }
}
