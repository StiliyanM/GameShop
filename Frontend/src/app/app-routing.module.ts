import { NgModule } from '@angular/core';

// Components
import { SigninComponent } from './components/authentication/signin/signin.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { IsAnonymousGuard } from './core/guards/is-anonymous.guard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'games',
    loadChildren: './components/game/game.module#GameModule',
  },

  { path: '', pathMatch: 'full', redirectTo: '/games/all' },
  { path: 'signin', canActivate: [IsAnonymousGuard], component: SigninComponent },
  { path: 'signup', canActivate: [IsAnonymousGuard], component: SignupComponent },
  { path: 'cart', canActivate: [AuthGuard], component: CartComponent },
  {
    path: '**',
    redirectTo: '/games/all'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
