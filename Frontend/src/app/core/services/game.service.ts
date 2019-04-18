import { Injectable } from '@angular/core';
import { Game } from '../models/game';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs';
import { ApiService } from './common';

@Injectable()
export class GameService {
  games: Game[] = [
    {
      id: 1,
      genre: 'Action-adventure',
      cover: 'https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg',
      publisher: 'Rockstar games',
      year: 2018,
      title: 'Read Dead Redemtion 2',
      price: 10,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: 2,
      genre: 'Action-adventure',
      cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4f-fKwjZuTG39L6bRkHlC6d5nbzKV9Oo0x4zj449otNAb8XyR',
      publisher: 'Rockstar games',
      year: 2018,
      title: 'Read Dead Redemtion 2',
      price: 10,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
  ]

  constructor(
      private http: ApiService
    ) {  }

 all() {
    //  return this.http.get('games/all')
    return of(this.games)
 }
 create(game: Game): Observable<any> {
  return this.http.post('games/add', {game: game})
}

edit(game: Game): Observable<any> {
  return this.http.put('games/edit', {game: game})
}

delete(id: number) {
  return this.http.delete('games/delete', {id: id} )
}

byId(id: number) {
  return of(this.games[0])
}

}
