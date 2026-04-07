import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { IProduct } from '../interface/all';
import { isPlatformBrowser } from '@angular/common';
export interface ICartItem{
  product: IProduct,
  quantity: number
}
@Injectable({
  providedIn: 'root',
})
export class CartService  {
  platform = inject(PLATFORM_ID)
  getCart(): ICartItem[]{
    if(!isPlatformBrowser(this.platform)) return []
    const data = localStorage.getItem('cart')
    return data ? JSON.parse(data) : []
  }

  addToCart(product: IProduct){
    if(!isPlatformBrowser(this.platform)) return 
    const cart = this.getCart()
    const index =cart.findIndex(item => item.product.id === product.id)
    if(index >- 1){
      cart[index].quantity++
    }else{
      cart.push({product, quantity: 1})
    }
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  removeFromCart(id: number){
    if(!isPlatformBrowser(this.platform)) return 
    const cart =this.getCart().filter(item => item.product.id !== id)
    localStorage.setItem('cart', JSON.stringify(cart))
  }
  updateQuantity(id: number, quantity: number){
    if(!isPlatformBrowser(this.platform)) return 
    const cart = this.getCart()
    const index = cart.findIndex(item => item.product.id === id)
    if(index > - 1){
      cart[index].quantity =quantity
      if(cart[index].quantity <= 0) cart.splice(index, 1)
    }
  localStorage.setItem('cart', JSON.stringify(cart))
  }
  getTotal(): number{
    return this.getCart().reduce((total, item) => total + item.product.price * item.quantity,0)
  }
}
