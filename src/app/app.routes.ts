import { Routes } from '@angular/router';
import { Category } from './crud/crudcategory/category/category';
import { Categoryadd } from './crud/crudcategory/categoryadd/categoryadd';
import { Categoryedit } from './crud/crudcategory/categoryedit/categoryedit';
import { Product } from './crud/crudproduct/product/product';
import { Productadd } from './crud/crudproduct/productadd/productadd';
import { Productedit } from './crud/crudproduct/productedit/productedit';
import { adminGuard } from './guard/admin-guard';
import { Adminlayout } from './layout/adminlayout/adminlayout';
import { UserLayout } from './layout/user-layout/user-layout';
import { Login } from './page/auth/login/login';
import { Register } from './page/auth/register/register';
import { Cart } from './page/cart/cart';
import { Categoryuser } from './page/category/category';
import { Detail } from './page/detail/detail';
import { Main } from './page/main/main';
import { Search } from './page/search/search';
import { Auth } from './crud/crudauth/auth/auth';
import { Authadd } from './crud/crudauth/authadd/authadd';
import { Authedit } from './crud/crudauth/authedit/authedit';
export const routes: Routes = [
  {
    path: '', component: UserLayout, children: [
      { path: '', component: Main },
      { path: 'detail/:id', component: Detail },
      { path: 'category', component: Categoryuser },
      { path: 'category/:id', component: Categoryuser },
      { path: 'cart', component: Cart },
      { path: 'search', component: Search },
    ]
  },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  {
    path: 'admin', component: Adminlayout, canActivate: [adminGuard], children: [
      { path: 'product', component: Product },
      { path: 'product/add', component: Productadd },
      { path: 'product/edit/:id', component: Productedit },
      { path: 'category', component: Category },
      { path: 'category/add', component: Categoryadd },
      { path: 'category/edit/:id', component: Categoryedit },
      { path: 'auth', component: Auth },
      { path: 'auth/add', component: Authadd },
      { path: 'auth/edit/:id', component: Authedit },
    ]
  }
];