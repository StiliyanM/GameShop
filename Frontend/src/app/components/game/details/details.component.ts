import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/core/models/game';
import { GameService } from 'src/app/core/services/game.service';
import { CartService, AuthService } from 'src/app/core/services';
import { Order } from 'src/app/core/models/order';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/core/services/common/confirmation-dialog.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  game: Game
  isLogged: boolean
  isAdmin: boolean

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private auth: AuthService,
    private router: Router,
    private confirmDialog: ConfirmationDialogService) { }

  ngOnInit() {

    this.isAdmin = this.auth.isAdmin
    this.isLogged = this.auth.isAuthenticated()
    const id = this.route.snapshot.paramMap.get('gameId');
    this.gameService.byId(id).subscribe(resp => {

      this.game = resp.data
    })
  }

  buy() {
    const item = new Order()
    item.gameId = this.game.id
    item.title = this.game.title
    item.price = this.game.price
    item.quantity = 1


    this.cartService.add(item)
    this.router.navigate(['/cart'])
  }

  confirm() {
    this.confirmDialog.confirm('Delete Game', 'Are you sure ?')
      .then((confirmed) => {
        if (confirmed) {
          this.gameService.delete(this.game.id)
        }
      })
  }


}
