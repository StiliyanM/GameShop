import { Injectable, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from './order.service';
import { ToastrService } from './common';

@Injectable()
export class CartService implements OnInit {
  // testing purposes
  items: Order[] = [
    {
      gameId: 1,
      title: 'Read Dead Redemtion 2',
      price: 10,
      quantity: 1
    },
    {
      gameId: 2,
      title: 'Read Dead Redemtion 2',
      price: 10,
      quantity: 1
    },
  ]

  constructor(private orderService: OrderService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]))
    }
  }


  all() {
    return JSON.parse(localStorage.getItem('cart'))
  }
  add(order: Order) {
    const items = this.all()
    items.push(order)
    this.save(items);
  }

  remove(id: number) {
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
