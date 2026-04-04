import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { IProduct } from '../../../interface/all';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-product',
  imports: [NzTableModule, NzPopconfirmModule, RouterLink],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  http = inject(HttpClient)
  chan = inject(ChangeDetectorRef)
  products: IProduct[] = []
  message = inject(NzMessageService)
  async ngOnInit(){
     this.http.get<IProduct[]>("http://localhost:3000/products?_expand=category").subscribe({
      next: (data) =>{  
        this.products = data
        this.chan.markForCheck()
      },
      error: (err) =>{
        console.log(err)
        this.message.error(" lay san pham that bai")
      }
    })
  }
  delete(id: number) {
    this.http.delete(`http://localhost:3000/products/${id}`).subscribe({
      next: () =>{
        this.message.success("xoa thanh cong")
        this.chan.markForCheck()
        this.products = this.products.filter(item => item.id !== id)
      },
      error: (err) =>{
        console.log(err);
        this.message.error("xoa that bai")
      }
    })
  }
}
