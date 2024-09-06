export interface ProductInterface {
    id: string;
    name: string;
    description?: string;
    price: number;
}

// Interface pour les nouveaux produits sans 'id'
export interface NewProductInterface extends Omit<ProductInterface, 'id'> { }

// Interface pour les mises à jour partielles
export interface PatchProductInterface extends Partial<NewProductInterface> { }
