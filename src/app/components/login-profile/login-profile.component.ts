import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/Services/profile.service';
import { AlertsService } from 'src/app/Services/alerts.service';
import { Profile } from 'src/app/Models/profile';
import { userInfo } from 'os';

@Component({
  selector: 'app-login-profile',
  templateUrl: './login-profile.component.html',
  styleUrls: ['./login-profile.component.css']
})
export class LoginProfileComponent implements OnInit {

  constructor(private profileObject: ProfileService, private alertsObject: AlertsService) { }
  model: Profile;
  response: any;
  pinValue: any;

  ngOnInit() {
    this.model = new Profile();
    this.model.name = "(No data)";
    this.model.image = "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg";
    this.model.email = "(No data)"
    this.model.lastWeekAverage = "(No data)";
    this.model.currentWeekAverage = "(No data)";
    this.model.arrival = 8;
  }

  login() {
    this.profileObject.getProfile(this.pinValue).subscribe(data => {
      this.response = data;
      this.model.name = this.response.name != null ? this.response.name : "(No Data)";
      this.model.image = this.response.image != "" ? this.response.image : "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg";
      this.model.email = this.response.email != null ? this.response.email : "(No data)";
      this.model.lastWeekAverage = this.response.lastWeekAverage != null ? this.response.lastWeekAverage : "(No data)";
      this.model.currentWeekAverage = this.response.currentWeekAverage != null ? this.response.currentWeekAverage : "(No data)";
      this.model.arrival = this.response.arrival != null ? this.response.arrival : 8; 
    }, error => {
      this.alertsObject.alertMessage(this.response.info, this.response.type);
    });
    this.model.pin = this.pinValue;
    document.getElementById("LoginInput").style.display = "none";
    document.getElementById("ProfileDisplay").hidden = false;
  }
}
