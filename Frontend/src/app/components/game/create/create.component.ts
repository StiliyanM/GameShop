// Decorators and Lifehooks
import { Component, OnInit } from '@angular/core';

// Forms
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

// Router
import { Router } from '@angular/router';
import { GameService } from 'src/app/core/services/game.service';

// Services

@Component({
  selector: 'app-game-create',
  templateUrl: './create.component.html',
})
export class CreateComponent implements OnInit {
  createForm: FormGroup;

  constructor(
    private router: Router,
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      'title': new FormControl('', [
        Validators.required
      ]),
      'author': new FormControl('', [
        Validators.required
      ]),
      'genre': new FormControl('', [
        Validators.required
      ]),
      'year': new FormControl('', [
        Validators.required
      ]),
      'description': new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
      'cover': new FormControl('', [
        Validators.required,
      ]),
      'price': new FormControl('', [
        Validators.required,
        Validators.min(0)
      ])
    });
  }

  onSubmit(): void {
    this.gameService
      .create(this.createForm.value)
      .subscribe((res) => {
        this.router.navigate([`/book/details/${res.data._id}`]);
      });
  }

  get title(): AbstractControl {
    return this.createForm.get('title');
  }

  get author(): AbstractControl {
    return this.createForm.get('author');
  }

  get genre(): AbstractControl {
    return this.createForm.get('genre');
  }

  get year(): AbstractControl {
    return this.createForm.get('year');
  }

  get description(): AbstractControl {
    return this.createForm.get('description');
  }

  get cover(): AbstractControl {
    return this.createForm.get('cover');
  }

  get isbn(): AbstractControl {
    return this.createForm.get('isbn');
  }

  get pagesCount(): AbstractControl {
    return this.createForm.get('pagesCount');
  }

  get price(): AbstractControl {
    return this.createForm.get('price');
  }

}
