import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/common/navigation/navigation.component';
import { SigninComponent } from './components/authentication/signin/signin.component';
import { SignupComponent } from './components/authentication/signup/signup.component';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { CollapseDirective } from './components/shared/directives/collapse.directive';
import { DropdownDirective } from './components/shared/directives/dropdown.directive';
import { CartComponent } from './components/cart/cart.component';
import { FooterComponent } from './components/common/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SigninComponent,
    SignupComponent,
    CollapseDirective,
    DropdownDirective,
    CartComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    NgbModule.forRoot()
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
