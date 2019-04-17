import { Injectable } from '@angular/core';
import { Game } from '../models/game';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';

@Injectable()
export class CartService {
  items: Cart[] = [
    {
      id: 1,
      title: 'Read Dead Redemtion 2',
      price: 10,
      quantity: 1
    },
    {
      id: 2,
      title: 'Read Dead Redemtion 2',
      price: 10,
      quantity: 1
    },
  ]

  constructor(

    ) {  }

 all() {

     return of(this.items)
 }
 create(value: any): Observable<any> {
  throw new Error('Method not implemented.');
}

}
