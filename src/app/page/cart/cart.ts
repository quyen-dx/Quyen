import { Component, inject } from '@angular/core';
import {CartService , ICartItem } from '../../services/cart';
import { NgFor, NgIf } from "@angular/common";

@Component({
  selector: 'app-cart',
  imports: [NgFor, NgIf],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cartService = inject(CartService)
  get cartItems(): ICartItem[]{
    return this.cartService.getCart()
  }
  get total(): number{
    return this.cartService.getTotal()
  }
  remove(id: number){
    this.cartService.removeFromCart(id)
  }
  updateQty(id: number, qty: number){
    this.cartService.updateQuantity(id, qty)
  }
}
