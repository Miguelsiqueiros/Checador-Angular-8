import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/Services/profile.service';
import { AlertsService } from 'src/app/Services/alerts.service';
import { Profile } from 'src/app/Models/profile';

@Component({
  selector: 'app-login-profile',
  templateUrl: './login-profile.component.html',
  styleUrls: ['./login-profile.component.css']
})
export class LoginProfileComponent implements OnInit {

  constructor(private profileObject: ProfileService, private alertsObject: AlertsService) { }
  model: Profile;

  ngOnInit() {
    this.model = new Profile();
    this.model.name = "Calvin Klein";
    this.model.image = "https://material.angular.io/assets/img/examples/shiba2.jpg";
    this.model.email = "calvin@klein.com"
    this.model.lastWeekAverage = "56";
    this.model.currentWeekAverage = "32";
    this.model.arrival = 8;
  }

  login() {
    
  }
}
