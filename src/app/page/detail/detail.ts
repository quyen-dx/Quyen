import { isPlatformBrowser, NgForOf, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProduct } from '../../interface/all';
import { CartService  } from '../../services/cart';
@Component({
  selector: 'app-detail',
  imports: [NgIf, NgForOf, RouterLink],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail {
  route = inject(ActivatedRoute)
  http = inject(HttpClient)
  product!: IProduct
  chan = inject(ChangeDetectorRef)
  products: IProduct[] = []
  slImage: string = ''
  images: string[] = []
  platfromId = inject(PLATFORM_ID)
  cartService = inject(CartService )
  qty = 1
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (isPlatformBrowser(this.platfromId)) {
        window.scrollTo(0, 0)
      }
      const id = params.get('id')
      this.http.get<IProduct>(`http://localhost:3000/products/${id}?_expand=category`).subscribe({
        next: (data) => {
          this.product = data
          this.chan.markForCheck()
          this.images = data.images?.length ? [data.image, ...data.images] : [data.image]
          this.slImage = data.image
        }
      })
    })


    this.http.get<IProduct[]>("http://localhost:3000/products?_expand=category").subscribe({
      next: (data) => {
        this.products = data
        this.chan.markForCheck()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  addToCart(){
    this.cartService.addToCart(this.product)
  }
  decreaseQty(){
    if(this.qty > 1) this.qty--
}
}