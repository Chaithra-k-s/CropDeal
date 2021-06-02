import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { observable, Observable } from 'rxjs';
import { CropServiceService } from '../services/crop-service.service';
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
  ngOnInit(): void {
    this.invoiceservice.getCartItems().subscribe(data=>{
      console.log(data);
      this.add=data;
    })
    console.log();
    console.log(this.add);
  }

  clearTable() {
    this.invoiceservice.deleteCart().subscribe(data=>{
      console.log(data);
      this.add=data
    })    
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
  // transactions: crop[] = [this.add];

  // /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.add.map((data: { crop_price: Number; }) => data.crop_price).reduce((acc:any, value:any) => acc + value, 0);
  }
}
