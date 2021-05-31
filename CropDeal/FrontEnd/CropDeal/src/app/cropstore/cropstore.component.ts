import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CropServiceService} from '../crop-service.service';


@Component({
  selector: 'app-cropstore',
  templateUrl: './cropstore.component.html',
  styleUrls: ['./cropstore.component.css']
})
export class CropstoreComponent implements OnInit {

  constructor(private service:CropServiceService, private router:Router) { }
  crops:any;
  type:any
  particularcrop:any

  ngOnInit(): void {
    this.service.getcrop().subscribe(data=>{ 
      this.crops=data;
      console.log(data);
      this.type=typeof(this.crops)
    })
  }
  redirect(){
    this.router.navigateByUrl("/providecrop")
  }
  cropdetails(value:any){
      this.particularcrop=this.service.filtercrop(value).subscribe(data=>{
        console.log(data)
      })
  }
 
  }
