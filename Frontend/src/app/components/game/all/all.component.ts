import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/core/services/game.service';
import { Game } from 'src/app/core/models/game';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  games: Game[]
  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.all().subscribe((data) => {
      this.games = data
    })
  }
}
