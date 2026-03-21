import { Routes } from '@angular/router';
import { Main } from './page/main/main';
import { Detail } from './page/detail/detail';
import { Category } from './page/category/category';
import { Cart } from './page/cart/cart';
export const routes: Routes = [
  { path: '', component: Main },
  { path: 'detail/:id', component: Detail },
  { path: 'category', component: Category },
  { path: 'cart', component: Cart },
];