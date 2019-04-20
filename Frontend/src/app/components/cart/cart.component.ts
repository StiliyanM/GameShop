import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/core/models/order';
import { CartService } from 'src/app/core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items: Order[]
  total: number

  options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  constructor(private cartService: CartService, private router: Router) {
    this.items = this.cartService.all();
    if (this.items) {
      this.calcTotalPrice()
    }
  }

  ngOnInit() {
  }

  isDisabled() {
    return this.items.length === 0
  }

  changeSelected(id: string, option: number) {
    this.items.find(i => i.gameId === id).quantity = option

    this.calcTotalPrice()
  }

  calcTotalPrice() {
    this.total = this.items.length

  }

  remove(id: string) {
    this.items = this.items.filter(i => i.gameId !== id)
    this.cartService.remove(id)
    this.calcTotalPrice()
  }

  checkout() {
    this.cartService.checkout(this.items)
    this.router.navigate(['/games/all'])
  }
}
