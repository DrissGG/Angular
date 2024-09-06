import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NewProductInterface } from '../interfaces/product.interface';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  productForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [null, [Validators.required, Validators.min(0)]],
    });
  }

  register() {
    this.isSubmitted = true;
    if (this.productForm.valid) {
      const product: NewProductInterface = this.productForm.value;
      console.log(`Ajout du produit`, product);

      // Souscription à l'observable retourné par addProduct
      this.productsService.addProduct(product).subscribe({
        next: (response) => {
          console.log('Produit ajouté avec succès:', response);
          // Réinitialisez le formulaire ou naviguez vers une autre page
          this.productForm.reset();
          this.isSubmitted = false;
          this.router.navigate(['/get']); // Redirige vers la liste des produits
        },
        error: (error) => {
          console.error(`Erreur lors de l'ajout du produit:`, error);
          // Gérez l'erreur (par exemple, affichez un message à l'utilisateur)
        },
      });
    } else {
      console.log(`Problème lors de l'ajout du formulaire`);
    }
  }
}
