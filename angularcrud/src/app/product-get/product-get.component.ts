import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importez CommonModule
import { ProductsService } from '../products.service';
import { ProductInterface } from '../interfaces/product.interface';
import { Router } from '@angular/router'; // Importez Router

@Component({
  selector: 'app-product-get',
  standalone: true, // Indique que le composant est autonome
  imports: [CommonModule], // Ajoutez CommonModule ici
  templateUrl: './product-get.component.html',
  styleUrls: ['./product-get.component.css'],
})
export class ProductGetComponent {
  products: ProductInterface[] = [];
  productIdToDelete: string | null = null;
  showModal: boolean = false;

  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit() {
    this.productsService.loadProducts().subscribe({
      next: (products) => {
        console.log('Liste des produits chargée avec succès:', products);
        this.products = products;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de la liste des produits :', error);
      },
    });
  }

  openConfirmDeleteModal(id: string) {
    this.productIdToDelete = id;
    this.showModal = true;
  }

  handleConfirmDelete() {
    if (this.productIdToDelete) {
      this.productsService.deleteProduct(this.productIdToDelete).subscribe({
        next: (product) => {
          console.log('Produit supprimé avec succès:', product);
          this.products = this.products.filter((p) => p.id !== this.productIdToDelete);
          this.productIdToDelete = null;
          this.showModal = false;
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du produit :', error);
          this.showModal = false;
        },
      });
    }
  }

  handleCancelDelete() {
    this.productIdToDelete = null;
    this.showModal = false;
  }

  handleEditProduct(id: string) {
    this.router.navigate(['/edit', id]);
  }
}
