import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Banner } from '../../nav/banner/banner';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../../interface/all';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-main',
  imports: [RouterLink,Banner],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {
  http = inject(HttpClient)
  products: IProduct[] = []
  chan = inject(ChangeDetectorRef)
  message = inject(NzMessageService)
  ngOnInit(){
    this.http.get<IProduct[]>("http://localhost:3000/products?_expand=category&_sort=id&_order=desc&_limit=4").subscribe({
      next:(data) =>{
        this.products = data
        this.chan.markForCheck()
      },
      error:(err) =>{
        console.log(err)
        this.message.error("lay san pham that bai")
      }
    })
  }
}
