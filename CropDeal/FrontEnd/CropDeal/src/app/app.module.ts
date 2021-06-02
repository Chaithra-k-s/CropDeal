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

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    DeleteaccountpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [LoginService,CropServiceService,FarmerService,DealerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
