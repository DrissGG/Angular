import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../products.service';
import { ProductInterface } from '../interfaces/product.interface';

@Component({
  selector: 'app-product-get',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-get.component.html',
  styleUrls: ['./product-get.component.css'],
})
export class ProductGetComponent {
  products: ProductInterface[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.loadProducts().subscribe({
      next: (products) => {
        console.log('Liste des produits chargée avec succès:', products);
        this.products = products;
      },
      error: (error) => {
        console.error(`Erreur lors de la récupération de la liste des produits :`, error);
      },
    });
  }

  handleDeleteProduct(id: string) {
    this.productsService.deleteProduct(id).subscribe({
      next: (product) => {
        console.log('Produit supprimé avec succès:', product);
        // Filtrer le produit supprimé de la liste
        this.products = this.products.filter((p) => p.id !== id);
      },
      error: (error) => {
        console.error(`Erreur lors de la suppression du produit :`, error);
      },
    });
  }
}
