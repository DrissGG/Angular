---
number headings: first-level 1, max 6, 1.1
---

![[images/diginamic_logo_3-02.png]]
- [[#1 Introduction|1 Introduction]]
- [[#2 Création du projet angularcrud|2 Création du projet angularcrud]]
	- [[#2 Création du projet angularcrud#2.1 Ajout de bootstrap 5 et de json-server|2.1 Ajout de bootstrap 5 et de json-server]]
- [[#3 Créer 3 composants sans les tests|3 Créer 3 composants sans les tests]]
- [[#4 Gestion des routes|4 Gestion des routes]]
- [[#5 Création de l'interface pour les produits|5 Création de l'interface pour les produits]]
- [[#6 Formulaire d'ajout|6 Formulaire d'ajout]]
	- [[#6 Formulaire d'ajout#6.1 Piloté par le ``template``|6.1 Piloté par le ``template``]]
	- [[#6 Formulaire d'ajout#6.2 Piloté par le code (reactive form)|6.2 Piloté par le code (reactive form)]]
	- [[#6 Formulaire d'ajout#6.3 UI attendue du formulaire|6.3 UI attendue du formulaire]]
- [[#7 Création des services|7 Création des services]]
	- [[#7 Création des services#7.1 Utilisation de json-server|7.1 Utilisation de json-server]]
	- [[#7 Création des services#7.2 Service d'ajout|7.2 Service d'ajout]]
		- [[#7.2 Service d'ajout#7.2.1 HttpClient|7.2.1 HttpClient]]
		- [[#7.2 Service d'ajout#7.2.2 HttpClient et RXJS|7.2.2 HttpClient et RXJS]]
		- [[#7.2 Service d'ajout#7.2.3 Souscription et redirection|7.2.3 Souscription et redirection]]
	- [[#7 Création des services#7.3 Service de chargement des données|7.3 Service de chargement des données]]
		- [[#7.3 Service de chargement des données#7.3.1 Création du service|7.3.1 Création du service]]
		- [[#7.3 Service de chargement des données#7.3.2 Injection du service|7.3.2 Injection du service]]
		- [[#7.3 Service de chargement des données#7.3.3 Affichage des produits|7.3.3 Affichage des produits]]
	- [[#7 Création des services#7.4 Service de modification|7.4 Service de modification]]
		- [[#7.4 Service de modification#7.4.1 Création d'une nouvelle interface|7.4.1 Création d'une nouvelle interface]]
		- [[#7.4 Service de modification#7.4.2 Ajout du service|7.4.2 Ajout du service]]
		- [[#7.4 Service de modification#7.4.3 Modification du composant|7.4.3 Modification du composant]]
		- [[#7.4 Service de modification#7.4.4 Affichage du formulaire|7.4.4 Affichage du formulaire]]
	- [[#7 Création des services#7.5 Service de suppression d'un produit|7.5 Service de suppression d'un produit]]
		- [[#7.5 Service de suppression d'un produit#7.5.1 Ajout du service|7.5.1 Ajout du service]]
		- [[#7.5 Service de suppression d'un produit#7.5.2 Modification du composant|7.5.2 Modification du composant]]
		- [[#7.5 Service de suppression d'un produit#7.5.3 Modification du template|7.5.3 Modification du template]]

# 1 Introduction
Le but de ce TP est de créer un simple CRUD de produit. Pour simuler le serveur d'API REST, nous utiliserons json-server
# 2 Création du projet angularcrud
```bash
ng new angularcrud
```
## 2.1 Ajout de bootstrap 5 et de json-server
Attention à vous placer dans le dossier angular10crud
```bash
npm install bootstrap@5
npm i -g json-server
```
Puis ajouter la référence vers le fichier css de bootsrap dans le fichier angular.json :

```json
"styles": [
   "node_modules/bootstrap/dist/css/bootstrap.min.css",
    "src/styles.css"
 ],
```
# 3 Créer 3 composants sans les tests 

```bash
ng g c product-add --skip-tests 
ng g c product-get --skip-tests  
ng g c product-edit --skip-tests
```
où :
- `g`: raccourci pour "generate"
- `c`: raccourci pour "component"
# 4 Gestion des routes
Vérification du fichier ``src/app/app.config.ts`` qui  fournit le ``routeur`` à l'application

```ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
```

Création de la configuration pour définir les associations entre les URLs et les composants. Cela se fait généralement dans un fichier dédié nommé src/app/app.routes.ts :

```ts
import { Routes } from '@angular/router';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductGetComponent } from './product-get/product-get.component';

export const routes: Routes = [
  { path: 'add', component: ProductAddComponent },
  { path: 'edit:id', component: ProductEditComponent },
  { path: 'get', component: ProductGetComponent },

];
```

Modification du template ``src/app/app.component.html`` pour ajouter les liens de navigation et les éléments de mise en forme de base :

```html
<header class="container">
  <h1>TP CRUD Angular</h1>
  <nav class="d-flex gap-3">
    <a routerLink="/add" routerLinkActive="selected-menu">Ajouter un produit</a>
    <a routerLink="/get" routerLinkActive="selected-menu">Voir les produits</a>

  </nav>
</header>
<main class="main container">
  <router-outlet></router-outlet>
</main>
```

Modification de app.component.ts pour bénéficier des Routes :
```typescript
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})

export class AppComponent {
  title = 'angularcrud';
}
```
# 5 Création de l'interface pour les produits
Créer le fichier src\/app\/interfaces\/product.interface.ts
```ts
export interface ProductInterface {
  id: string;
  name: string;
  description?: string;
  price: number;
}

export interface NewProductInterface extends Omit<ProductInterface, 'id'> {}
```
# 6 Formulaire d'ajout
## 6.1 Piloté par le ``template``
``src\app\product-add\product-add.component.html`` :
```html
<form
  (ngSubmit)="register(productAddForm.value)"
  #productAddForm="ngForm"
>
  <label>Nom : </label>
  <input name="name" ngModel />
  <label>Description : </label>
  <input name="description" ngModel />
  <label>Prix : </label>
  <input name="price" ngModel />
  <button type="submit" class="btn btn-success">Ajouter un produit</button>
</form>
```
Vous remarquerez l'utilisation de la variable locale #taskForm 
qui permet d'envoyer, à la soumission du formulaire, l'ensemble des données entrées par l'utilisateur.

Pour des raisons de mise en page avec bootstrap 5, le fichier peut se transformer en :
```html
<div class="row">
  <div class="col-sm-12 mt-4">
    <form (ngSubmit)="register(productAddForm.value)" #productAddForm="ngForm">
      <div class="row mb-3">
        <div class="col-sm-2">
          <label class="input-group-text">Nom : </label>
        </div>
        <div class="col-sm-10">
          <input name="name" class="form-control w-50" ngModel />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm-2 col-form-label">
          <label class="input-group-text">Description : </label>
        </div>
        <div class="col-sm-10">
          <textarea
            name="description"
            class="form-control w-50"
            ngModel
          ></textarea>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm-2">
          <label class="input-group-text">Prix : </label>
        </div>
        <div class="col-sm-10">
          <input
            name="price"
            class="form-control w-auto"
            type="number"
            ngModel
          />
        </div>
      </div>
      <div class="row">
        <div class="col-sm-2">
          <button type="submit" class="btn btn-success w-100">
            Ajouter un produit
          </button>
        </div>
      </div>
    </form>
  </div>
</div>
```
## 6.2 Piloté par le code (reactive form)
Pour piloter le formulaire d'ajout par le code, il vous faudra modifier le fichier principal du composant src\/app\/product-add\/product-add.component.ts :
```ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { NewProductInterface } from '../interfaces/product.interface';

@Component({

  selector: 'app-product-add',
  standalone: true,

  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css',
})

export class ProductAddComponent implements OnInit {
  // l'opérateur de non-nullité (!) indique à TypeScript que l'on est certain que productForm sera initialisé avant d'être utilisé
  productForm!: FormGroup; 
  isSubmitted = false;

  constructor(private fb: FormBuilder) {}
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
    } else console.log(`Problème lors de l'ajout du formulaire`);
  }
}
```
ainsi que le ``template``  src\app\product-add\product-add.component.html :
```html
<div class="row">
  <div class="col-sm-12 mt-4">
    <form [formGroup]="productForm" (ngSubmit)="register()">
      <div class="row mb-3">
        <div class="col-sm-2">
          <label class="input-group-text">Nom : </label>
        </div>
        <div class="col-sm-10">
          <input formControlName="name" class="form-control w-50" />
          <div
            *ngIf="
              (productForm.get('name')?.invalid &&
                (productForm.get('name')?.touched ||
                  productForm.get('name')?.dirty)) ||
              (isSubmitted && productForm.get('name')?.invalid)"
          >
            <div
             *ngIf="productForm.get('name')?.errors?.['required']"
              class="alert alert-danger w-50"
            >
              Nom de produit requis
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm-2 col-form-label">
          <label class="input-group-text">Description : </label>
        </div>
        <div class="col-sm-10">
          <textarea
            formControlName="description"
            class="form-control w-50"
          ></textarea>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm-2">
          <label class="input-group-text">Prix : </label>
        </div>
        <div class="col-sm-10">
          <input
            formControlName="price"
            class="form-control w-auto"
            type="number"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-sm-2">
          <button type="submit" class="btn btn-success w-100">
            Ajouter un produit
          </button>
        </div>
      </div>
    </form>
  </div>
</div>
```


## 6.3 UI attendue du formulaire
Vous devriez obtenir le résultat suivant :
![[../images/formAdd.png]]
# 7 Création des services

```bash
ng g s products --skip-tests
```
où :
- `g`: raccourci pour "generate"
- `s`: raccourci pour "service"
Cette commande va ajouter le fichier service : ``src/app/products.service.ts``
## 7.1 Utilisation de json-server
Pour simuler un serveur d'API REST, nous utilisons[ json-server](https://www.npmjs.com/package/json-server)
Installation de json-server :
```shell
npm install -g json-server
```
Création du fichier db.json
```json
{
  "products": [
    {
      "id": 1,
      "name": "Vélo VTT RockRider",
      "description": "Presque neuf",
      "price": 120
    },
    {
      "id": 2,
      "name": "Vélo de ville Peugeot",
      "description": "Un look d'un autre temps",
      "price": 190
    }
  ]
}
```

Attention à bien vous placer dans le répertoire qui contient le fichier db.json pour lancer le serveur :
```shell
npx json-server db.json
```

Le serveur doit vous renvoyer un message de ce style dans la console :
```shell
  \{^_^}/ hi!

  Loading db.json
  Done

  Resources
  http://localhost:3000/products

  Home
  http://localhost:3000
```
## 7.2 Service d'ajout 
### 7.2.1 HttpClient
Ajout de HttpClient dans src/app/app.config.ts : 
```ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient()],

};
```
### 7.2.2 HttpClient et RXJS
Ensuite il nous faut modifier le service (src\/app\/products.service.ts) afin d'injecter le service HttpClient et de l'utiliser avec des observables :
```ts
import { Injectable } from '@angular/core';
import {
  NewProductInterface,
  ProductInterface,
} from './interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ProductsService {
  static url = 'http://localhost:3000/products';
  constructor(private http: HttpClient) {}

  addProduct(product: NewProductInterface): Observable<ProductInterface> {
    console.log(`Dans addProduct de ProductsService`, product);
    return this.http.post<ProductInterface>(ProductsService.url, product);
  }
}
```
### 7.2.3 Souscription et redirection
Enfin, il faut modifier le composant ``src/app/product-add/product-add.component.ts `` afin de souscrire à l'observable retourné par ``addProduct`` :
```ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NewProductInterface } from '../interfaces/product.interface';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css',
})

export class ProductAddComponent implements OnInit {
  productForm!: FormGroup; //l'opérateur de non-nullité (!) indique à TypeScript que l'on est certain que

  // productForm sera initialisé avant d'être utilisé
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private router: Router
  ) {}

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
          this.router.navigate(['/get']);
        },

        error: (error) => {
          console.error(`Erreur lors de l'ajout du produit:`, error);
          // Gérez l'erreur (par exemple, affichez un message à l'utilisateur)
        },
      });
    } else console.log(`Problème lors de l'ajout du formulaire`);
  }
}
```

## 7.3 Service de chargement des données
### 7.3.1 Création du service
Modification du fichier ``src/app/products.service.ts`` pour ajouter la méthode ``loadProducts``
```ts
import { Injectable } from '@angular/core';
import {
  NewProductInterface,
  ProductInterface,
} from './interfaces/product.interface';

import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, throwError } from 'rxjs';
 
@Injectable({
  providedIn: 'root',
})

export class ProductsService {
  static url = 'http://localhost:3000/products';
  constructor(private http: HttpClient) {}
  addProduct(product: NewProductInterface): Observable<ProductInterface> {
    console.log(`Dans addProduct de ProductsService`, product);
    return this.http.post<ProductInterface>(ProductsService.url, product);
  }
  loadProducts(): Observable<ProductInterface[]> {
    console.log(`Dans loadProduct de ProductsService`);
    return this.http.get<ProductInterface[]>(ProductsService.url);
  }
}
```

### 7.3.2 Injection du service
Modifier le fichier ``src/app/product-get/product-get.component.ts`` :
```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../products.service';
import { ProductInterface } from '../interfaces/product.interface';

@Component({
  selector: 'app-product-get',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-get.component.html',
  styleUrl: './product-get.component.css',
})

export class ProductGetComponent {
  products: ProductInterface[] = [];
  constructor(private productsService: ProductsService) {}
  ngOnInit() {
    this.productsService.loadProducts().subscribe({
      next: (products) => {
        console.log('liste des produits chargées avec succès:', products);
        this.products = products;
      },

      error: (error) => {
        console.error(
          `Erreur lors de la récupération de la liste des produits :`,
          error
        );
      },
    });
  }
}
```
### 7.3.3 Affichage des produits
Modification du fichier ``src/app/product-get/product-get.component.html`` :
```html
<div class="container mt-4">
  <h2 class="mb-4">Liste des Produits</h2>
  <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
    <div class="col" *ngFor="let product of products">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">{{ product.name }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">ID : {{ product.id }}</h6>
          <p class="card-text">{{ product.description }}</p>
          <p class="card-text">
            <strong>Prix : {{ product.price }}</strong>
          </p>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary me-2">Modifier</button>
          <button class="btn btn-danger">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
</div>
```
## 7.4 Service de modification
### 7.4.1 Création d'une nouvelle interface
``Modifier le fichier src/app/interfaces/product.interface.ts ``:
```ts
export interface ProductInterface {
  id: string;
  name: string;
  description?: string;
  price: number;
}

export interface NewProductInterface extends Omit<ProductInterface, 'id'> {}

export interface PatchProductInterface extends Partial<NewProductInterface> {}
```
### 7.4.2 Ajout du service
``src/app/products.service.ts``
```ts
import { Injectable } from '@angular/core';
import {
  NewProductInterface,
  PatchProductInterface,
  ProductInterface,
} from './interfaces/product.interface';

import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class ProductsService {
  static url = 'http://localhost:3000/products';
  constructor(private http: HttpClient) {}

  addProduct(product: NewProductInterface): Observable<ProductInterface> {
    console.log(`Dans addProduct de ProductsService`, product);
    return this.http.post<ProductInterface>(ProductsService.url, product);
  }

  loadProducts(): Observable<ProductInterface[]> {
    console.log(`Dans loadProduct de ProductsService`);
    return this.http.get<ProductInterface[]>(ProductsService.url);
  }

  loadOneProduct(id: string): Observable<ProductInterface> {
    console.log(`Dans loadOneProduct de ProductsService`);
    return this.http.get<ProductInterface>(`${ProductsService.url}/${id}`);
  }

  patchProduct(
    id: string,
    partialProduct: PatchProductInterface
  ): Observable<ProductInterface> {
    console.log(`Dans patchProduct de ProductsService`);
    return this.http.patch<ProductInterface>(
      `${ProductsService.url}/${id}`,
      partialProduct
    );
  }
}
```
### 7.4.3 Modification du composant
``src\app\product-edit\product-edit.component.ts``
Remarquez l'injection du service et la mise en place d'un ``reactive form`` :
```ts
import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';
import {
  NewProductInterface,
  ProductInterface,
} from '../interfaces/product.interface';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css',
})

export class ProductEditComponent {

  id!: string | null;
  product!: ProductInterface | null;
  productForm!: FormGroup;
  isSubmitted = false;
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      console.log(`Id du produit récupéré dans le chemin `, this.id);
      if (this.id) {
        this.productsService.loadOneProduct(this.id).subscribe({
          next: (product) => {
            console.log('produit chargé avec succès:', product);
            this.product = product;
            this.productForm = this.fb.group({
              name: [
                this.product ? this.product.name : '',
                Validators.required,
              ],
              description: [this.product ? this.product.description : ''],
              price: [
                this.product ? this.product.price : null,
                [Validators.required, Validators.min(0)],
              ],
            });
          },
          error: (error) => {
            console.error(`Erreur lors de la récupération du produit :`, error);
            // Gérez l'erreur (par exemple, affichez un message à l'utilisateur)
          },
        });
      }
    });
  }

  register() {
    this.isSubmitted = true;
    console.log(`Dans register de product edit `);
    if (this.productForm.valid) {
      const upProduct: NewProductInterface = this.productForm.value;
      console.log(`Ajout du produit`, upProduct);

      // Souscription à l'observable retourné par patchProduct
      if (this.product && this.product.id) {
        this.productsService
          .patchProduct(this.product.id, upProduct)
          .subscribe({
            next: (response) => {
              console.log('Produit modifié avec succès:', response);
              // Réinitialisez le formulaire ou naviguez vers une autre page
              this.productForm.reset();
              this.isSubmitted = false;
              this.router.navigate(['/get']);
            },
            error: (error) => {
              console.error(
                `Erreur lors de la modification du produit:`,
                error
              );
            },
          });
      }
    } else console.log(`Problème lors de l'ajout du formulaire`);
  }
}
```
 
### 7.4.4 Affichage du formulaire
``src/app/product-edit/product-edit.component.html``
```html

<div class="row" *ngIf="product">
  <div class="col-sm-12 mt-4">
    <form [formGroup]="productForm" (ngSubmit)="register()">
      <div class="row mb-3">
        <div class="col-sm-2">
          <label class="input-group-text">Nom : </label>
        </div>
        <div class="col-sm-10">
          <input formControlName="name" class="form-control w-50" />
          <div
            *ngIf="
              (productForm.get('name')?.invalid &&
                (productForm.get('name')?.touched ||
                  productForm.get('name')?.dirty)) ||
              (isSubmitted && productForm.get('name')?.invalid)
            "
          >
            <div
             *ngIf="productForm.get('name')?.errors?.['required']"
              class="alert alert-danger w-50"
            >
              Nom de produit requis
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-sm-2 col-form-label">
          <label class="input-group-text">Description : </label>
        </div>
        <div class="col-sm-10">
          <textarea
            formControlName="description"
            class="form-control w-50"
          ></textarea>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm-2">
          <label class="input-group-text">Prix : </label>
        </div>
        <div class="col-sm-10">
          <input
            formControlName="price"
            class="form-control w-auto"
            type="number"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-sm-2">
          <button type="submit" class="btn btn-success w-100">
            Modifier le produit
          </button>
        </div>
      </div>
    </form>
  </div>
</div>
```
## 7.5 Service de suppression d'un produit
### 7.5.1 Ajout du service
Ajout de la méthode ``deleteProduct`` au fichier ``src/app/products.service.ts`` :
```ts
deleteProduct(id: string): Observable<ProductInterface> {
    console.log(`Dans deleteProduct de ProductsService`);
    return this.http.delete<ProductInterface>(`${ProductsService.url}/${id}`);
  }
}
```
### 7.5.2 Modification du composant 
Ajout de la méthode ``handleDeleteProduct`` au fichier
``src/app/product-get/product-get.component.ts`` :
```ts
handleDeleteProduct(id: string) {
    this.productsService.deleteProduct(id).subscribe({
      next: (product) => {
        console.log('Produit supprimé avec succès:', product);
        this.products = this.products.filter((p) => p.id !== id);
      },
    });
  }
```
### 7.5.3 Modification du template
``src/app/product-get/product-get.component.html``

```html
<button
  class="btn btn-danger"
  (click)="handleDeleteProduct(product.id)"
>
    Supprimer
</button>
```
### Exercice
Finalisez l'interface en utilisant une fenêtre "modale" qui demande une confirmation avant de supprimer réellement le produit.
Pour cela vous serez amené à créer deux méthodes supplémentaires : 
- handleConfirmDelete(id: string)
- handleCancelDelete() 

et à aménager le code [HTML d'une modale bootstrap](https://getbootstrap.com/docs/5.0/components/modal/) :
```html
<div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalToggleLabel">Modal 1</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Show a second modal and hide this one with the button below.
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Open second modal</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalToggleLabel2">Modal 2</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Hide this modal and show the first with the button below.
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal">Back to first</button>
      </div>
    </div>
  </div>
</div>
<a class="btn btn-primary" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Open first modal</a>
```