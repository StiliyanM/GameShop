import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/core/services/game.service';
import { Game } from 'src/app/core/models/game';
import { BaseComponent } from '../../shared/base.component';
import { takeWhile } from 'rxjs/internal/operators/takeWhile';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent extends BaseComponent implements OnInit {

  games: Game[]
  constructor(private gameService: GameService) {
    super()
   }

  ngOnInit() {

    this.gameService.all()
    .pipe(takeWhile(_ => this.isAlive))
    .subscribe((resp) => {
      this.games = resp.data
    })
  }
}
