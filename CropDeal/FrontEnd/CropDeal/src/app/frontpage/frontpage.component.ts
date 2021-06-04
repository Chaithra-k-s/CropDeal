import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {

  constructor(private profileservice:ProfileService) { }

  ngOnInit(): void {
    console.log(this.profileservice.user);
  }

}
