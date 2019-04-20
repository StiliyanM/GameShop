import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { GameService } from 'src/app/core/services/game.service';
import { Game } from 'src/app/core/models/game';
import { BaseComponent } from '../../shared/base.component';
import { takeWhile } from 'rxjs/operators';


@Component({
  selector: 'app-game-create',
  templateUrl: './create.component.html',
})
export class CreateComponent extends BaseComponent {

  game: Game = new Game()

  constructor(
    private router: Router,
    private gameService: GameService,
  ) {
    super()
  }
  create(game) {
    this.gameService.create(game)
      .pipe(takeWhile(_ => this.isAlive))
      .subscribe(() => {
        this.router.navigate(['/game/all']);
      });
  }

}

