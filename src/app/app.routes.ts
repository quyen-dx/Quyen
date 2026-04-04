import { Routes } from '@angular/router';
import { Product } from './crud/crudproduct/product/product';
import { Productadd } from './crud/crudproduct/productadd/productadd';
import { Productedit } from './crud/crudproduct/productedit/productedit';
import { Adminlayout } from './layout/adminlayout/adminlayout';
import { UserLayout } from './layout/user-layout/user-layout';
import { Cart } from './page/cart/cart';
// import { Category } from './page/category/category';
import { Detail } from './page/detail/detail';
import { Main } from './page/main/main';
import { Category } from './crud/crudcategory/category/category';
import { Categoryadd } from './crud/crudcategory/categoryadd/categoryadd';
import { Categoryedit } from './crud/crudcategory/categoryedit/categoryedit';
import { adminGuard } from './guard/admin-guard';
export const routes: Routes = [
  {
    path: '', component: UserLayout, children: [
      { path: '', component: Main },
      { path: 'detail/:id', component: Detail },
      // { path: 'category', component: Category },
      { path: 'cart', component: Cart },
    ]
  },

  {
    path: 'admin', component: Adminlayout,canActivate:[adminGuard], children: [
      { path: 'product', component: Product },
      { path: 'product/add', component: Productadd },
      { path: 'product/edit/:id', component: Productedit },
      { path: 'category', component: Category },
      { path: 'category/add', component: Categoryadd},
      { path: 'category/edit/:id', component: Categoryedit },
    ]
  }
];