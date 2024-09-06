import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NewProductInterface, ProductInterface, PatchProductInterface } from '../interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  id!: string | null;
  product!: ProductInterface | null;
  productForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      console.log(`Id du produit récupéré dans le chemin `, this.id);
      if (this.id) {
        this.productsService.loadOneProduct(this.id).subscribe({
          next: (product) => {
            console.log('Produit chargé avec succès:', product);
            this.product = product;
            this.productForm = this.fb.group({
              name: [this.product ? this.product.name : '', Validators.required],
              description: [this.product ? this.product.description : ''],
              price: [this.product ? this.product.price : null, [Validators.required, Validators.min(0)]],
            });
          },
          error: (error) => {
            console.error(`Erreur lors de la récupération du produit :`, error);
          },
        });
      }
    });
  }

  register() {
    this.isSubmitted = true;
    console.log(`Dans register de product edit`);
    if (this.productForm.valid) {
      const upProduct: PatchProductInterface = this.productForm.value;
      console.log(`Modification du produit`, upProduct);

      if (this.product && this.product.id) {
        this.productsService.patchProduct(this.product.id, upProduct).subscribe({
          next: (response) => {
            console.log('Produit modifié avec succès:', response);
            this.productForm.reset();
            this.isSubmitted = false;
            this.router.navigate(['/get']);
          },
          error: (error) => {
            console.error(`Erreur lors de la modification du produit:`, error);
          },
        });
      }
    } else {
      console.log(`Problème lors de l'ajout du formulaire`);
    }
  }
}
