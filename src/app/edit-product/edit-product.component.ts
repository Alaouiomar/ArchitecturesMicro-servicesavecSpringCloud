import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../services/products.service";
import {Product} from "../model/product.model";
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productId!: string;
  product!: Product;
  productFormGroup!: FormGroup;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              public prodService: ProductsService,
              private fb: FormBuilder) {
    this.productId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.http.get("http://localhost:8888/PRODUCT-SERVICE/products/"+ this.productId).subscribe({
      next: (product) => {
        this.productFormGroup = this.fb.group({
          name: this.fb.control(this.product.name, [Validators.required, Validators.minLength(4)]),
          price: this.fb.control(this.product.price, [Validators.required, Validators.min(200)]),
          promotion: this.fb.control(this.product.promotion, [Validators.required]),
        });
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  handleUpdateProduct() {
    let p = this.productFormGroup.value;
    p.id = this.product.id;
    this.prodService.updateProduct(p).subscribe({
      next: (prod) => {
        alert("Product updated successfully");
      },
      error: err => {
        console.log(err);
      }
    })
  }

}
