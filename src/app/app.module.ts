import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ROUTING } from './app.routing';

import { AppComponent } from './app.component';
import { SigninComponent } from "./components/signin/signin.component";
import { SearchComponent } from './components/search/search.component';
import { InfoComponent } from './components/info/info.component';

import { AuthnService } from './services/authn.service';
import { InteractService } from './services/interact.service';
import { CommonService } from './services/common.service';

import { CONFIG } from './config';
import { HttpClientModule } from '@angular/common/http';
import { SignOffComponent } from './components/signoff/signoff.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SearchComponent,
    InfoComponent,
    SignOffComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ROUTING
  ],
  providers: [AuthnService, InteractService, CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
