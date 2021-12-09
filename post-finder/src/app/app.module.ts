import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { AppRouteGuard } from './shared/services/auth-route-guard.service';
import { HttpConfigInterceptor } from './shared/Interceptors/httpconfig.interceptor';
import { NavComponent } from './shared/components/nav/nav.component';
import { AutoBidComponent } from './shared/components/auto-bid/auto-bid.component';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IvyCarouselModule,
    AutocompleteLibModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [AppRouteGuard, { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
