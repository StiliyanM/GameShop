import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/core/models/game';
import { GameService } from 'src/app/core/services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {

  gameId: string

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get('gameId');
  }

  save(game: Game) {
      game._id = this.gameId
      this.gameService.edit(game)
      .subscribe(() => {
        this.router.navigate([ '/car/details', game._id ]);
      })

  }

}
