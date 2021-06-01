import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CropServiceService } from '../crop-service.service';
import { crop } from '../observables';

@Component({
  selector: 'app-invoicepage',
  templateUrl: './invoicepage.component.html',
  styleUrls: ['./invoicepage.component.css']
})
export class InvoicepageComponent implements OnInit {

  constructor(private service:CropServiceService) { }
    // invent=[]
    invent=Array<crop[]>()
    add:any | crop[]
  ngOnInit(): void {
    
    this.add=this.service.crop;
    
    this.invent.push(this.add) 
    console.log(this.invent);
  }

}
