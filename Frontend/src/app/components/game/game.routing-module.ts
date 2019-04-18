import { AllComponent } from './all/all.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';

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
      component: DetailsComponent
    },
    {
      path: 'edit/:gameId',
      component: EditComponent
    },
    {
      path: 'create',
    //   canActivate: [IsAdminGuard],
      component: CreateComponent
    },
    // {
    //   path: 'edit/:bookId',
    //   canActivate: [IsAdminGuard],
    //   component: BookEditComponent
    // },
    // {
    //   path: 'delete/:bookId',
    //   canActivate: [IsAdminGuard],
    //   component: BookDeleteComponent
    // }
  ];

  @NgModule({
    imports: [RouterModule.forChild(gameRoutes)],
    exports: [RouterModule]
  })
  export class GameRoutingModule { }
