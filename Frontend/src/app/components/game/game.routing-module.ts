import { AllComponent } from './all/all.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { IsAdminGuard } from 'src/app/core/guards/is-admin.guard';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const gameRoutes: Routes = [
    {
      path: '',
      redirectTo: 'all',
      pathMatch: 'full'
    },
    {
      path: 'all',
      component: AllComponent
    },
    {
      path: 'details/:gameId',
      canActivate: [AuthGuard],
      component: DetailsComponent
    },
    {
      path: 'edit/:gameId',
      canActivate: [IsAdminGuard],
      component: EditComponent
    },
    {
      path: 'create',
      canActivate: [IsAdminGuard],
      component: CreateComponent
    },
  ];

  @NgModule({
    imports: [RouterModule.forChild(gameRoutes)],
    exports: [RouterModule]
  })
  export class GameRoutingModule { }
