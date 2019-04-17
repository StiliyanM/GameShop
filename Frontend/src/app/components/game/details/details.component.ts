import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/core/models/game';
import { GameService } from 'src/app/core/services/game.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  game: Game
  constructor(private gameService: GameService, private router: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.router.snapshot.paramMap.get('gameId');
    this.gameService.byId(id).subscribe(data => {
      this.game = data
    })
  }

}
