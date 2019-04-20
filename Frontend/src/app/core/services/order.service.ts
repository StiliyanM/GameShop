import { Injectable } from '@angular/core';
import { ApiService } from './common';
import { Order } from '../models/order';
import { Observable } from 'rxjs';


@Injectable()
export class OrderService {

  constructor(private http: ApiService) {
  }

  add(orders: Order[]): Observable<any> {
     return this.http.post('order/checkout', orders);
  }


}
