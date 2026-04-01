import { ProductService } from '../services/product';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableModule } from 'ng-zorro-antd/table';
import { IProduct } from '../../../interface/product';
@Component({
  selector: 'app-products',
  imports: [RouterLink, NzTableModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  productsService = inject(ProductService)
  message = inject(NzMessageService)
  products: IProduct[] = []
  changdt = inject(ChangeDetectorRef)
  async ngOnInit() {
    this.productsService.getAll().subscribe({
      next: (data: IProduct[]) =>{
          this.products = data
          this.changdt.markForCheck()
          this.message.success("lay san pham thanh cong")
      },
      error: (err) =>{
        console.log(err)
        this.message.error("lay san pham that bai")
      }
    })
  }
  delete(id: number | string, name: string){
    if(!confirm(`Xoa san pham   ${name}`)) return
    this.productsService.delete(id).subscribe({
      next: () =>{
        this.message.success("xoa thanh cong")
        this.products = this.products.filter(item => item.id !== id)
        this.changdt.markForCheck()
      },
      error: (err)=>{
        console.log(err)
        this.message.error("xoa that bai")
      }
    })
  }

}
