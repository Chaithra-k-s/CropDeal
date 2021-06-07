import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CropstoreComponent } from './cropstore/cropstore.component';
import { DealerRegisterComponent } from './dealer-register/dealer-register.component';
import { DealerlistComponent } from './dealerlist/dealerlist.component';
import { DeleteaccountpageComponent } from './deleteaccountpage/deleteaccountpage.component';
import { FarmerRegisterComponent } from './farmer-register/farmer-register.component';
import { FarmerlistComponent } from './farmerlist/farmerlist.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { InvoicepageComponent } from './cart/invoicepage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UploadCropComponent } from './upload-crop/upload-crop.component';
import { CompleteComponent } from './complete/complete.component';

const routes: Routes = [
  {path:"home",component:FrontpageComponent},
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"cart",component:InvoicepageComponent},
  {path:"product",component:CropstoreComponent},
  {path:"farmerRegister",component:FarmerRegisterComponent},
  {path:"dealerRegister",component:DealerRegisterComponent},
  {path:"providecrop",component:UploadCropComponent},
  {path:"receipt",component:FarmerlistComponent},
  {path:"dealers",component:DealerlistComponent},
  {path:"deleteuser",component:DeleteaccountpageComponent},
  {path:"complete",component:CompleteComponent},
  {path:"**",pathMatch:"full",redirectTo:"home"}
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
  FarmerRegisterComponent,
  FarmerlistComponent,
  DealerlistComponent,
  UploadCropComponent
]
