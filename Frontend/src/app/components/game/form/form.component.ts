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

  @Input() game: any

  @Output() onSubmitForm = new EventEmitter<Object>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    if (!this.game) {
      this.game = {
        title: '',
        publisher: '',
        genre: '',
        year: '',
        cover: '',
        price: '',
        description: '',
      }
    }
    this.form = this.formBuilder.group({
      title: [{ value: this.game.title }, [ Validators.required ]],
      publisher : [{ value: this.game.publisher }, [ Validators.required ]],
      genre: [{ value: this.game.genre }, [Validators.required] ],
      year: [{ value: this.game.year}, [ Validators.required, Validators.min(1990) ]],
      cover: [{ value: this.game.cover }, [Validators.required] ],
      price: [{ value: this.game.price }, [ Validators.required, Validators.min(0) ]],
      description: [{ value: this.game.description }, [Validators.required, Validators.minLength(10) ]],
    });

    this.fields = this.form.controls;
  }

  submit() {
    this.onSubmitForm.emit(this.form.value);
    this.form.reset();
  }
}