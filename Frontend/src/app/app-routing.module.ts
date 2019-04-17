import { NgModule } from '@angular/core';

// Components
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/authentication/signin/signin.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  {
    path: 'games',
    loadChildren: './components/game/game.module#GameModule',
    // canActivate: [AuthGuard]
  },

  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'cart', component: CartComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
