import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/core/models/game';
import { GameService } from 'src/app/core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../shared/base.component';
import { takeWhile } from 'rxjs/internal/operators/takeWhile';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent extends BaseComponent implements OnInit {

  gameId: string

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router) {
    super()
  }

  ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get('gameId');
  }

  save(game: Game) {
    game._id = this.gameId
    this.gameService.edit(game)
      .pipe(takeWhile(_ => this.isAlive))
      .subscribe(() => {
        this.router.navigate(['/car/details', game._id]);
      })

  }

}
