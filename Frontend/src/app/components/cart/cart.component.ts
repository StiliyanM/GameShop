import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/core/models/cart';
import { CartService } from 'src/app/core/services';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items: Cart[]
  total: number
  options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.all().subscribe(data => {
      this.items = Object.assign([], data)
    })
    this.calcTotalPrice()
  }

  changeSelected(id: number, option: number) {
    this.items.find(i => i.id === id).quantity = option

    this.calcTotalPrice()
  }

  calcTotalPrice() {
    this.total = this.items.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity
  }, 0)

  }
}
