import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { GameService } from 'src/app/core/services/game.service';
import { Game } from 'src/app/core/models/game';


@Component({
  selector: 'app-game-create',
  templateUrl: './create.component.html',
})
export class CreateComponent {

  constructor(
    private router: Router,
    private gameService: GameService,
  ) { }
  create(game) {
    this.gameService.create(game).subscribe(() => {
      this.router.navigate([ '/game/all' ]);
    });
  }
  }

}
