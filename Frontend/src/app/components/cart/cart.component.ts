import { Component, OnInit } from '@angular/core';
import {  Order } from 'src/app/core/models/order';
import { CartService } from 'src/app/core/services';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items: Order[]
  total: number
  options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.items = this.cartService.all();
    this.calcTotalPrice()
  }

  changeSelected(id: string, option: number) {
    this.items.find(i => i.gameId === id).quantity = option

    this.calcTotalPrice()
  }

  calcTotalPrice() {
    this.total = this.items.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity
  }, 0)

  }

  remove(id: string) {
    this.items = this.items.filter(i => i.gameId !== id)

    this.cartService.remove(id)
  }

  checkout() {
    this.cartService.checkout(this.items);

    this.items = [];
  }
}
