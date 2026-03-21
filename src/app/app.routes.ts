import { Routes } from '@angular/router';
import { Main } from './page/main/main';
import { Detail } from './page/detail/detail';
import { Category } from './page/category/category';
export const routes: Routes = [
  { path: '', component: Main },
  { path: 'detail/:id', component: Detail },
  { path: 'category', component: Category },
];