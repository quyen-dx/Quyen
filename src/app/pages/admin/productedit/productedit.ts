import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IProduct } from '../../../interface/product';
import { ProductService } from '../services/product';
@Component({
  selector: 'app-productedit',
  imports: [FormsModule, NzButtonModule, NzInputModule, NzFormModule, RouterLink],
  templateUrl: './productedit.html',
  styleUrl: './productedit.css',
})
export class Productedit {
  route = inject(ActivatedRoute)
  router = inject(Router)
  product: IProduct = {} as IProduct
  changdt = inject(ChangeDetectorRef)
  productService = inject(ProductService)
  message = inject(NzMessageService);
  async ngOnInit() {
    const id = this.route.snapshot.params['id']
    const res = await fetch(`http://localhost:3000/products/${id}`)
    this.product = await res.json()
    this.changdt.markForCheck()
  }
  onSubmit (f: NgForm){
    if(!f.valid){
      this.message.error("nhap day du thong tin") 
      return
    }
    this.productService.update(this.product.id, this.product).subscribe({
      next: ()=>{
        this.message.success("sua thanh cong")
        this.router.navigate(["/admin/products"])
      },
      error: () =>{
        this.message.error("sua that bai")
      }
    })
  }
}
