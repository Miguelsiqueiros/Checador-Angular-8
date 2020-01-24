import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/Models/user';
import { CheckInService } from 'src/app/Services/checkIn.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  profileForm = new FormGroup({
    fullName: new FormControl(''),
    photoURL: new FormControl('')
  });

  newPin:any;


  constructor(private _snackBar: MatSnackBar, private registerObject: CheckInService) { }
  pinText: string;
  model: User;
  ngOnInit() {
    this.model = new User();
    this.pinText = "1426";
  }

  SubmitData() {
    this.model.name = this.profileForm.get("fullName").value;
    this.model.image = this.profileForm.get("photoURL").value;
    console.log(this.model);
    this.registerObject.registerName(this.model).subscribe(response => {  
      this.newPin = response;
      this.RetrievePin(this.newPin.pin);
      }, error=>{});    
  }
  
  RetrievePin(pin: string) {
    this._snackBar.open("Your PIN number is " + pin, "Got it!", {
      duration: 100000,
    })
  }

  AlreadyInUseMessage() {
    this._snackBar.open("Username is already in use", "", {
      duration: 3000,
    })
  }

  IncompleteDataMessage() {
    this._snackBar.open("You have fields left to complete", "Got it!", {
      duration: 4000,
    })
  }
}
