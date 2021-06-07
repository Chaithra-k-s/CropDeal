import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from '../services/invoice.service';
import { crop } from '../observables';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-invoicepage',
  templateUrl: './invoicepage.component.html',
  styleUrls: ['./invoicepage.component.css']
})
export class InvoicepageComponent implements OnInit {

  constructor(private invoiceservice:InvoiceService,
    private router:Router, private profileservice:ProfileService ) { }
  paymentHandler:any=null;
   add:any | crop[];
   total=0;
    data=true;
  ngOnInit(): void {
    if(!this.profileservice._id.length){
      console.log(!this.profileservice._id.length);
      this.data=false
    }
    this.invoiceservice.getCartItems().subscribe(data=>{
      console.log(data);
      this.add=data;
      this.invoiceservice.cart=data
    })
    //this.invokeStripe();
  }

//remove all
  clearTable() {
    this.invoiceservice.deleteCart().subscribe(data=>{
      this.add=data
    })    
  }

//total amount
  check(){
  return this.add.map((t: { crop_price: any; }) => 
  t.crop_price).reduce((acc: any, value: any) => acc + value, 0);
  }
  // invokeStripe(){
  //   if( !window.document.getElement){}
  // }
//generate invoice
  buynow(add:any){
    // const amount=this.check()
    // const paymentHandler =(<any>window).StripeCheckout.configure({
      // key:
      // 'pk_test_51IyUGPSFBbuL0qrEI7WiOgXVunKz28dmVA7Adr3TMsME7W1DEQ9blYVJdMUd83ZgdMLMvQKyHvmepMCiWtsoTcyq00EzEAmYIe',
      //  locale:'auto',
      //  token:function(stripeToken.card:any){
      //    console.log(stripeToken.card);
      //    alert('stripe token generated');  
      //  },
    // });
    // paymentHandler.open({
    //   name:'chaithra',

    // })
    this.router.navigateByUrl("receipt");
  }
  // deleting particular element
  remove(value:crop[]){
    this.invoiceservice.deleteCartItem(value).subscribe(data=>{
      this.add=data
     })
  }
//add element to cart
  addData() {
    this.router.navigateByUrl("product") 
  }

  displayedColumns: string[] = ['CROP NAME', 'CROP TYPE','QUANTITY','COST'];
}
