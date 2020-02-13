import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../Models/user';
import { CheckInService } from 'src/app/Services/checkIn.service';
import { AlertsService } from 'src/app/Services/alerts.service';
import { NGXLogger } from 'ngx-logger';
import { Time } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  profileForm = new FormGroup({
    fullName: new FormControl(''),
    photoURL: new FormControl(''),
    email: new FormControl(''),
    arrival: new FormControl('')
  });

  responseJson:any;


  constructor(private registerObject: CheckInService, public alerts: AlertsService, private logger:NGXLogger) { }
  pinText: string;
  model: User;
  ngOnInit() {
    this.model = new User();
  }

  SubmitData() {
    this.model.name = this.profileForm.get("fullName").value;
    this.model.email = this.profileForm.get("email").value;
    this.model.arrival = Number(this.profileForm.get("arrival").value.split(":")[0]);
    this.model.image = this.profileForm.get("photoURL").value;
    this.registerObject.registerName(this.model).subscribe(response => {  
      this.responseJson = response;
      this.alerts.alertMessage(this.responseJson.info, this.responseJson.type);
      }, error=>{
        this.logger.debug(error);
      this.alerts.alertMessage(this.responseJson.info, this.responseJson.type);
      });    
  } 
}
  
