import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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


  constructor(private _snackBar: MatSnackBar) { }
  pinText: string;

  ngOnInit() {
    this.pinText = "1426";
  }

  SubmitData(){

  }

  RetrievePin(pin:string) {
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
