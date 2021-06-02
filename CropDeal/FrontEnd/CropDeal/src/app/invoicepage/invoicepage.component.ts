import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { observable, Observable, timer } from 'rxjs';
import { CropServiceService } from '../services/crop-service.service';
import { InvoiceService } from '../services/invoice.service';
import { crop } from '../observables';
import { delay } from 'rxjs/operators';

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

  clearTable() {
    this.invoiceservice.deleteCart().subscribe(data=>{
      console.log(data);
      this.add=data
    })    
  }

  check(){
  return this.add.map((t: { crop_price: any; }) => t.crop_price).reduce((acc: any, value: any) => acc + value, 0);
  
  }

  clearElement(value:any){
    this.invoiceservice.deleteCartItem(value).subscribe(data=>{
      console.log(data); 
    })
  }

  addData() {
    this.router.navigateByUrl("/crop") 
  }

  displayedColumns: string[] = ['CROP NAME', 'CROP TYPE','QUANTITY','COST'];
}
