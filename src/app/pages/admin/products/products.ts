import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import { IProduct } from '../../../interface/product';
// import { ProductService } from '../services/product';
@Component({
  selector: 'app-products',
  imports: [RouterLink, NzTableModule, NzPopconfirmModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  // productsService = inject(ProductService)
  message = inject(NzMessageService)
  products: IProduct[] = []
  changdt = inject(ChangeDetectorRef)
  http = inject(HttpClient)
  async ngOnInit() {
    this.http.get<IProduct[]>(" http://localhost:3000/products").subscribe({
      next: (data) => {
        this.products = data
        this.changdt.markForCheck()
      },
      error: (err) => {
        console.log(err)
        this.message.error("lay san pham that bai")
      }
    })
  }
  delete(id: number, name: string) {
    // if(!confirm(`Xoa san pham   ${name}`)) return
    this.http.delete(`http://localhost:3000/products/${id}`).subscribe({
      next: () => {
        this.message.success(`xoa thanh cong ${name}`)
        this.products = this.products.filter(item => item.id !== id)
        this.changdt.markForCheck()
      },
      error: (err) => {
        console.log(err)
        this.message.error("xoa that bai")
      }
    })
  }

}
