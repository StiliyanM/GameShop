import { Injectable, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from './order.service';
import { of } from 'rxjs/internal/observable/of';
import { Subject } from 'rxjs/internal/Subject';

@Injectable()
export class CartService {

  constructor(private orderService: OrderService) { }

  all(): Order[] {
    const items = JSON.parse(localStorage.getItem('cart'))

    return items ? items : []
  }

  add(order: Order) {
    const items = this.all()

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
      .subscribe(() => {
        localStorage.removeItem('cart')
      })
  }

  private save(orders: Order[]) {
    localStorage.setItem('cart', JSON.stringify(orders))
  }

  has(id) {
    return this.all().some(o => o.gameId === id)
  }

  getCount() {
    return this.all().length
  }
}
