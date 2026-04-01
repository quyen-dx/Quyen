import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  http = inject(HttpClient)
  message = inject(NzMessageService)
  route = inject(ActivatedRoute)
  products: IProduct[] = []
  changdt = inject(ChangeDetectorRef)
  async ngOnInit() {
    // const keyword = this.route.snapshot.queryParams['keyword']
    // console.log(keyword);
    const res = await fetch(`http://localhost:3000/products`)
    this.products = await res.json()
    this.changdt.markForCheck()
  }
  delete(id: number, name: string) {
    if (!confirm(`Xac nhan xoa  "${name}"`)) {
      return
    }
    this.http.delete(`http://localhost:3000/products/${id}`).subscribe({
      next: () => {
        this.products = this.products.filter(item => item.id !== id)
        this.message.success("Xoá thành công");
        this.changdt.markForCheck()
      },
      error: () => {
        this.message.error("Xoá thất bại");
      }
    })

  }
}
