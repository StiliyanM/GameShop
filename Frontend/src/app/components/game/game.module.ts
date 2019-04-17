import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllComponent } from './all/all.component';
import { RouterModule } from '@angular/router';
import { GameRoutingModule } from './game.routing-module';
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    GameRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AllComponent, CreateComponent, DetailsComponent]
})
export class GameModule { }
