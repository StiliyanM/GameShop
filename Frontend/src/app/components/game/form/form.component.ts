import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Game } from 'src/app/core/models/game';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public form: FormGroup;
  public fields;

  @Input() game: Game

   onSubmitForm = new EventEmitter<Object>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: [ this.game.title, [ Validators.required ]],
      publisher : [ this.game.publisher, [ Validators.required ]],
      genre: [ this.game.genre, [Validators.required] ],
      year: [ this.game.year, [ Validators.required, Validators.min(1990) ]],
      cover: [this.game.cover, [Validators.required] ],
      price: [ this.game.price, [ Validators.required, Validators.min(0) ]],
      description: [ this.game.description, [Validators.required, Validators.minLength(10) ]],
    });

    this.fields = this.form.controls;
  }

  submit() {
    this.onSubmitForm.emit(this.form.value);
    this.form.reset();
  }
}
