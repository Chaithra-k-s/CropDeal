import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoicepageComponent } from '../cart/invoicepage.component';
import { FarmerlistComponent } from '../farmerlist/farmerlist.component';
import { InvoiceService } from '../services/invoice.service';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit {
show=true;
  constructor(private router:Router, private invoiceservice:InvoiceService) { }
  goback(){
    this.router.navigateByUrl("product")
  }
  ngOnInit(): void {
    this.invoiceservice.deleteCart().subscribe(data=>{
      console.log(data)
    }) 
    
  // let show=this.invoiceservice.amount
  // console.log(show);
  this.show=false
    this.submit
    // console.log(this.show);
  }
  submit(){
    this.show=false
    // console.log(this.show);
    
  }
 
}
