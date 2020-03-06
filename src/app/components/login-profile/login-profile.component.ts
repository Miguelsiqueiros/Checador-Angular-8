import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/Services/profile.service';
import { AlertsService } from 'src/app/Services/alerts.service';
import { Profile } from 'src/app/Models/profile';
import { userInfo } from 'os';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login-profile',
  templateUrl: './login-profile.component.html',
  styleUrls: ['./login-profile.component.css']
})
export class LoginProfileComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar, private alerts:AlertsService, private dialog: MatDialog, private profileObject: ProfileService, private alertsObject: AlertsService) { }
  model: Profile;
  modelUpdate: Profile;
  response: any;
  pinValue: any;
  value: any;
  url: any;
  arrival: any;
  userName: any;


  ngOnInit() {
    this.model = new Profile();
    this.model.name = "(No data)";
    this.model.image = "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg";
    this.model.email = "(No data)"
    this.model.lastWeekAverage = "(No data)";
    this.model.currentWeekAverage = "(No data)";
    this.model.arrival = 8;

    this.modelUpdate = new Profile();
  }

  openDialog(templateRef): void{
    const dialogRef = this.dialog.open(templateRef, {
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  update(){
    this.profileObject.saveProfileChanges(this.model).subscribe(data => {
      this.response = data;
      this.alertsObject.alertMessage(this.response.info, this.response.type);
    }, error => {
      this.alertsObject.alertMessage(this.response.info, this.response.type);
    });
  }

  removeImage() {
    this.model.image='https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg';
    this.update();
  }

  saveArrivalTime(){
    //to do
  }




  login() {
    this.profileObject.getProfile(this.pinValue).subscribe(data => {
      this.response = data;
      if (data != null) {
        this.model.name = this.response.name != null ? this.response.name : "(No Data)";
        this.model.image = this.response.image != "" ? this.response.image : "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg";
        this.model.email = this.response.email != null ? this.response.email : "(No data)";
        this.model.lastWeekAverage = this.response.lastWeekAverage != null ? this.response.lastWeekAverage : "(No data)";
        this.model.currentWeekAverage = this.response.currentWeekAverage != null ? this.response.currentWeekAverage : "(No data)";
        this.model.arrival = this.response.arrival != null ? this.response.arrival : 8;
        this.model.pin = this.pinValue;
        document.getElementById("LoginInput").style.display = "none";
        document.getElementById("ProfileDisplay").hidden = false;
    }

    }, error => {
      this.alertsObject.alertMessage(this.response.info, this.response.type);
    });

  }
}
