import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from '../services/invoice.service';
import { crop } from '../observables';

@Component({
  selector: 'app-invoicepage',
  templateUrl: './invoicepage.component.html',
  styleUrls: ['./invoicepage.component.css']
})
export class InvoicepageComponent implements OnInit {

  constructor(private invoiceservice:InvoiceService,private router:Router ) { }

   add:any | crop[];
   total=0;

  ngOnInit(): void {
    this.invoiceservice.getCartItems().subscribe(data=>{
      console.log(data);
      this.add=data;
    })
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
//generate invoice
  buynow(){
    this.router.navigateByUrl("");
  }
  // deleting particular element
  remove(value:crop[]){
    this.invoiceservice.deleteCartItem(value).subscribe(data=>{
      this.add=data
     })
  }
//add element to cart
  addData() {
    this.router.navigateByUrl("/crop") 
  }

  displayedColumns: string[] = ['CROP NAME', 'CROP TYPE','QUANTITY','COST'];
}
