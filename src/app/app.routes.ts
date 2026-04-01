import { Routes } from '@angular/router';
import { Adminlayout } from './layout/adminlayout/adminlayout';
import { Products } from './pages/admin/products/products';
import { Productadd } from './pages/admin/productadd/productadd';
import { Productedit } from './pages/admin/productedit/productedit';

export const routes: Routes = [

    {path:'admin',component:Adminlayout,children:[
        {path:'products',component:Products},
        {path:'products/add',component:Productadd},
        {path:'products/edit/:id',component:Productedit}
    ]}
];
