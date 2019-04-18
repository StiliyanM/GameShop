import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/core/models/game';
import { GameService } from 'src/app/core/services/game.service';
import { CartService } from 'src/app/core/services';
import { Order } from 'src/app/core/models/order';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  game: Game

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('gameId');
    this.gameService.byId(id).subscribe(data => {
      this.game = data
    })
  }

  buy() {

    const item = new Order()
    item.gameId = this.game.id,
      item.title = this.game.title,
      item.price = this.game.price,
      item.quantity = 1


    this.cartService.add(item)
    this.router.navigate(['/cart'])
  }

}
