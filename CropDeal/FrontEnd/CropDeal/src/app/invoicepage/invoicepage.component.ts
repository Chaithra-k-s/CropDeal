import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CropServiceService } from '../crop-service.service';
import { InvoiceService } from '../invoice.service';
import { crop } from '../observables';

@Component({
  selector: 'app-invoicepage',
  templateUrl: './invoicepage.component.html',
  styleUrls: ['./invoicepage.component.css']
})
export class InvoicepageComponent implements OnInit {

  constructor(private invoiceservice:InvoiceService,private router:Router) { }
    add: any | crop[];
  ngOnInit(): void {
    this.invoiceservice.getCartItems().subscribe(data=>{
      console.log(data);
      this.add=data;
      // this.transaction=this.add.entries
    })
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.add.filter = filterValue.trim().toLowerCase();
  }

  addData() {
    this.router.navigateByUrl("/crop") 
  }
  displayedColumns: string[] = ['CROP NAME', 'CROP TYPE','QUANTITY','COST'];
  // transactions: crop[] = [this.add];

  // /** Gets the total cost of all transactions. */
  // getTotalCost() {
  //   return this.transactions.map(t => t.crop_quantity).reduce((acc, value) => acc + value, 0);
  // }
}
