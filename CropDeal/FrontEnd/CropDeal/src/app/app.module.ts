import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { CropServiceService } from './services/crop-service.service';
import { FarmerService } from './services/farmer.service';
import { DealerService } from './services/dealer.service';
import { DeleteaccountpageComponent } from './deleteaccountpage/deleteaccountpage.component';
import { CompleteComponent } from './complete/complete.component';
import { ProfileService } from './services/profile.service';
import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    DeleteaccountpageComponent,
    CompleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NgxStripeModule.forRoot('pk_test_51IyUGPSFBbuL0qrEI7WiOgXVunKz28dmVA7Adr3TMsME7W1DEQ9blYVJdMUd83ZgdMLMvQKyHvmepMCiWtsoTcyq00EzEAmYIe')
  ],
  providers: [LoginService,CropServiceService,FarmerService,DealerService,ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
