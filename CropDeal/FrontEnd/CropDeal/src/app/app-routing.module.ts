import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CropstoreComponent } from './cropstore/cropstore.component';
import { DealerRegisterComponent } from './dealer-register/dealer-register.component';
import { FarmerRegisterComponent } from './farmer-register/farmer-register.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { InvoicepageComponent } from './invoicepage/invoicepage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UploadCropComponent } from './upload-crop/upload-crop.component';

const routes: Routes = [
  {path:"",component:FrontpageComponent},
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"invoice",component:InvoicepageComponent},
  {path:"crop",component:CropstoreComponent},
  {path:"farmerRegister",component:FarmerRegisterComponent},
  {path:"dealerRegister",component:DealerRegisterComponent},
  {path:"providecrop",component:UploadCropComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[
  RegisterComponent,
  FrontpageComponent,
  LoginComponent,
  InvoicepageComponent,
  CropstoreComponent,
  DealerRegisterComponent,
  FarmerRegisterComponent
]
