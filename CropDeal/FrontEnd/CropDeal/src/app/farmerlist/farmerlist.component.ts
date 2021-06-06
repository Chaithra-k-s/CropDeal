import { Component, OnInit } from '@angular/core';
import { crop } from '../observables';
import { InvoiceService } from '../services/invoice.service';

@Component({
  selector: 'app-farmerlist',
  templateUrl: './farmerlist.component.html',
  styleUrls: ['./farmerlist.component.css']
})
export class FarmerlistComponent implements OnInit {
data:any
visible=false
  constructor(private invoiceserver:InvoiceService) { }
  ngOnInit(): void {
    console.log(this.invoiceserver.cart); 
    this.data=this.invoiceserver.cart; 
    if(this.data.length==0){
      console.log(this.data.length);
      this.visible=true
    }
  }
remove(crop:any){
  console.log(crop);
  this.invoiceserver.deleteCartItem(crop._id);
}
checkout(){
  
}
}


