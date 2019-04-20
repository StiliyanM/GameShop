import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { Order } from 'src/app/core/models/order';
import { takeWhile } from 'rxjs/operators';
import { BaseComponent } from '../../shared/base.component';
import { OrderList } from 'src/app/core/models/order-list';

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.css']
})
export class MyComponent extends BaseComponent {

  orders: OrderList[]

  constructor(private orderService: OrderService) {
    super()
    this.orderService.getUserOrder()
    .pipe(takeWhile(_ => this.isAlive))
    .subscribe(resp => {
        this.orders = resp.data
    })

  }
}
