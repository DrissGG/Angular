import { Routes } from '@angular/router';
import { ProductGetComponent } from './product-get/product-get.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

export const routes: Routes = [
    { path: '', redirectTo: '/get', pathMatch: 'full' },
    { path: 'get', component: ProductGetComponent },
    { path: 'add', component: ProductAddComponent },
    { path: 'edit/:id', component: ProductEditComponent },
];
