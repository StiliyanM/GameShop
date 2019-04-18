import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllComponent } from './all/all.component';
import { RouterModule } from '@angular/router';
import { GameRoutingModule } from './game.routing-module';
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { FormComponent } from './form/form.component';
import { EditComponent } from './edit/edit.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    GameRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CoreModule,
  ],
  declarations: [AllComponent, CreateComponent, DetailsComponent, FormComponent, EditComponent],

})
export class GameModule { }
