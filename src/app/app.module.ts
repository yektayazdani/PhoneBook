import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { ServiceService } from './service.service';
import { EmailmodalComponent } from './emailmodal/emailmodal.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    EmailmodalComponent
    
    
  ],
  entryComponents:[EmailmodalComponent],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
