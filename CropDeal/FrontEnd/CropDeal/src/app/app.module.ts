import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login.service';
import { UploadCropComponent } from './upload-crop/upload-crop.component';
import { CropServiceService } from './crop-service.service';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    UploadCropComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [LoginService,CropServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
