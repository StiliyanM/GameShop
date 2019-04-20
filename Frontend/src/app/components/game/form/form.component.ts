import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Game } from 'src/app/core/models/game';
import { GameService } from 'src/app/core/services';
import { BaseComponent } from '../../shared/base.component';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends BaseComponent implements OnInit {
  public form: FormGroup;
  public fields;

  @Input() gameId: string

  game: Game
  @Output() onSubmitForm = new EventEmitter<Object>();
  ready = false
  constructor(private formBuilder: FormBuilder, private gameService: GameService) { 
    super()
  }

  ngOnInit() {

    if (this.gameId) {
      this.gameService.byId(this.gameId)
      .pipe(takeWhile(_ => this.isAlive))
      .subscribe(resp => {
        this.game = resp.data
        this.createForm()
        this.ready = true
      })
    } else {
      this.game = new Game()
      this.createForm()
      this.ready = true
    }

  }

  createForm() {
    this.form = this.formBuilder.group({
      title: [this.game.title, [Validators.required]],
      publisher: [this.game.publisher, [Validators.required]],
      genre: [this.game.genre, [Validators.required]],
      year: [this.game.year, [Validators.required, Validators.min(1990)]],
      cover: [this.game.cover, [Validators.required]],
      price: [this.game.price, [Validators.required, Validators.min(0)]],
      description: [this.game.description, [Validators.required, Validators.minLength(10)]],
    });

    this.fields = this.form.controls;

  }
  submit() {
    this.onSubmitForm.emit(this.form.value);
    this.form.reset();
  }
}
