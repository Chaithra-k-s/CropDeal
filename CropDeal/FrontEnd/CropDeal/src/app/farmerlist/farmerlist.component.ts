import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from '../services/invoice.service';
import { StripeCardComponent, StripeService} from "ngx-stripe";
import {
  loadStripe,
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';

import { HttpClient, HttpHandler } from '@angular/common/http';
import { Stripe } from 'stripe';


@Component({
  selector: 'app-farmerlist',
  templateUrl: './farmerlist.component.html',
  styleUrls: ['./farmerlist.component.css']
})
export class FarmerlistComponent implements OnInit {
data:any
visible=false
amount:any;
handler:any=null;

  constructor(private invoiceserver:InvoiceService,private router:Router,
    private stripeService: StripeService, private http:HttpClient) { }
  ngOnInit(): void {
    this.loadStripe();
    this.data=this.invoiceserver.cart; 
    if(this.data.length==0){
      console.log(this.data.length);
      this.visible=true
    }
   this.amount=this.invoiceserver.amount; 
  }

  elementsOptions: StripeElementsOptions = {
    locale: 'es'
  };

  loadStripe() {
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
          this.handler = (<any>window).StripeCheckout.configure({
            key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
            locale: 'auto',
            token: function (token: any) {
            console.log("Token is --> token.id"),
            this.http.post("http://localhost:4242/create-checkout-session",{
            token : token.id,
            amount:this.amount
            }).subscribe((res:any)=>{
              console.log("The response from server is ",res);
              console.log('Payment Done')
              console.log(token)
              alert('Payment Success!!');
            })
          }
      });
      }  
      window.document.body.appendChild(s);
    }  
  }

  pay(amount:any) {   
      const handler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_51IyUGPSFBbuL0qrEI7WiOgXVunKz28dmVA7Adr3TMsME7W1DEQ9blYVJdMUd83ZgdMLMvQKyHvmepMCiWtsoTcyq00EzEAmYIe',
        locale: 'auto',
        token: function (token: any) {
          // const YOUR_DOMAIN = 'http://localhost:4200';
          console.log(token);
        //   let http:HttpClient=handler;
        //  http.post("http://localhost:4242/create-checkout-session",{
        //     token : token.id,
        //     amount:this.amount
        //     }).subscribe((res:any)=>{
        //       console.log("The response from server is ",res);
        //       console.log('Payment Done')
        //       console.log(token)
              alert('Payment Success!!');
              handler.close({
                onended:(window.open("complete"))
              })
              //postMessage("successfull","http://localhost:4242/paynow")
        }
      });   
      handler.open({
      name: 'CROP DEAL',
      description: 'PURCHASE OF CROP',
      currency:"INR",
      amount: this.amount*100,
     
    });
    // this.invoiceserver.amount=true
  //  this.router.navigateByUrl('complete') 
  }
  // goback(){
  //   this.router.navigateByUrl("product")
  // }
}
