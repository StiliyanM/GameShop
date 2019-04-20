import { Injectable } from '@angular/core';
import { Game } from '../models/game';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs';
import { ApiService } from './common';

@Injectable()
export class GameService {

  constructor(
      private http: ApiService
    ) {  }

 all() {
     return this.http.get('games/all')
 }
 create(game: Game): Observable<any> {
  return this.http.post('games/add', game)
}

edit(game: Game): Observable<any> {

  return this.http.put(`games/edit/${game._id}`, game)
}

delete(id: string) {
  return this.http.delete(`games/delete/${id}`)
}

byId(id: string) {
  return this.http.get(`games/details/${id}`)
}

}
