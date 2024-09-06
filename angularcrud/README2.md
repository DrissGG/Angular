## Installation du Projet

1. **Cloner le dépôt :**
   git clone https://github.com/DrissGG/Angular.git
   cd Angular/angularcrud<angularcrud>
   </code></div></div></pre>
2. **Installer les dépendances :**
   Assurez-vous que vous avez [Node.js](https://nodejs.org/) installé. Ensuite, installez les dépendances du projet :
   npm install
   </code></div></div></pre>
3. **Installer `json-server` globalement :**
   `json-server` est utilisé pour simuler une API REST.
   npm install -g json-server
   </code></div></div></pre>

## Lancer le Projet

### Démarrer le Serveur `json-server`

**Lancer `json-server` :**

1. À la racine de votre projet (là où se trouve le fichier `db.json`), lancez `json-server` :
2. </span></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-bash">npx json-server db.json
   </code></div></div></pre>

   Vous devriez voir un message indiquant que le serveur est en cours d'exécution sur `http://localhost:3000/products`.

### Démarrer l'Application Angular

1. **Lancer le serveur de développement Angular :**
   Dans un terminal, naviguez jusqu'au répertoire de votre projet Angular et lancez le serveur de développement Angular :

   ng serve
   </code></div></div></pre>

   Par défaut, l'application sera disponible sur `http://localhost:4200`.

## Explications Techniques

### 1. **Utilisation de `json-server`**

`json-server` est utilisé pour simuler une API REST. Il permet de créer une API basée sur un fichier JSON en quelques secondes, ce qui est idéal pour le développement frontend lorsque vous n'avez pas encore mis en place un backend réel. Dans ce projet, `json-server` fournit une API simple pour gérer les produits.

### 2. **Service Angular avec `HttpClient`**

Le service `ProductsService` utilise `HttpClient` d'Angular pour communiquer avec l'API REST simulée par `json-server`. Il gère les opérations CRUD (Create, Read, Update, Delete) pour les produits :

* **`addProduct(product: NewProductInterface)`** : Ajoute un nouveau produit.
* **`loadProducts()`** : Charge tous les produits.
* **`loadOneProduct(id: string)`** : Charge un produit spécifique par son ID.
* **`patchProduct(id: string, partialProduct: PatchProductInterface)`** : Modifie un produit existant.
* **`handleDeleteProduct(id: string)`** : Supprime un produit.
* `handleConfirmDelete` et `handleCancelDelete` gèrent respectivement la confirmation et l'annulation de la suppression du produit. L'attribut `[ngClass]="{ 'show d-block': showModal }"` est utilisé pour afficher ou masquer la modale en fonction de l'état `showModal` dans le composant.

### 3. **Formulaires Réactifs avec Angular**

Les formulaires réactifs sont utilisés pour gérer les formulaires de manière plus structurée et dynamique. Ils permettent de définir les champs du formulaire, leurs validations et de gérer les données de manière programmatique. Dans ce projet :

* **`ProductAddComponent`** utilise un formulaire réactif pour ajouter un produit.
* **`ProductEditComponent`** utilise un formulaire réactif pour modifier un produit existant.

Les formulaires réactifs offrent plus de flexibilité que les formulaires basés sur les modèles et facilitent la gestion des validations et des interactions avec les données.

### 4. **Navigation avec Angular Router**

Angular Router est utilisé pour gérer la navigation entre les différentes pages de l'application. Les routes sont définies dans `app.route.ts` :

* **`/get`** : Affiche la liste des produits.
* **`/add`** : Affiche le formulaire pour ajouter un nouveau produit.
* **`/edit/:id`** : Affiche le formulaire pour modifier un produit existant.

La méthode `handleEditProduct` dans `ProductGetComponent` utilise `Router` pour naviguer vers la page de modification d'un produit.
