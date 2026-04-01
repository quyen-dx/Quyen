import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../../interface/product';

@Component({
  selector: 'app-productedit',
  imports: [],
  templateUrl: './productedit.html',
  styleUrl: './productedit.css',
})
export class Productedit {
  route = inject(ActivatedRoute)
  product:IProduct = {} as IProduct
  changdt = inject(ChangeDetectorRef)
  async ngOnInit(){
    const id = this.route.snapshot.params['id']
    // console.log(id);    
    const res = await fetch(`http://localhost:3000/products/${id}`)
    this.product= await res.json()
    this.changdt.markForCheck()
  }
}
