import { Injectable, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from './order.service';
import { ToastrService } from './common';

@Injectable()
export class CartService {

  constructor(private orderService: OrderService, private toastrService: ToastrService) { }


  all() {
    return JSON.parse(localStorage.getItem('cart'))
  }
  add(order: Order) {
    let items = this.all()
    if (!items) {
      items = []
    }
    items.push(order)
    this.save(items);
  }

  remove(id: string) {
    let items = JSON.parse(localStorage.getItem('cart'))
    items = items.filter(o => o.gameId !== id)

    this.save(items)
  }

  checkout(orders: Order[]) {

    this.orderService.add(orders)
      .subscribe((result) => {
        this.toastrService.success(result.message)
        localStorage.removeItem('cart')
      })
  }

  private save(orders: Order[]) {
    localStorage.setItem('cart', JSON.stringify(orders))
  }

}
