import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-CreatePTO',
  templateUrl: './CreatePTO.component.html',
  styleUrls: ['./CreatePTO.component.css']
})
export class CreatePTOComponent implements OnInit {

  profileForm = new FormGroup({
    pinNumber: new FormControl(''),
    estimatedArrival: new FormControl('')
  });

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit() {
 
  }

  Submit(){
    this.SuccessMessage();
  }

  IncompleteDataMessage() {
    this._snackBar.open("You have fields left to complete", "Got it!", {
      duration: 4000,
      verticalPosition: 'top',
    })
  }

  WrongPinMessage(){
    this._snackBar.open("The PIN you entered doesn't exist", "", {
      duration: 2000,
      verticalPosition: 'top',
    })
  }

  AlreadyPTOMessage(){
    this._snackBar.open("User already has already a PTO for today", "", {
      duration: 2000,
      verticalPosition: 'top',
    })
  }

  SuccessMessage(){
    this._snackBar.open("PTO succesfully created, your penalization time is X minutes", "Got It", {
      //duration: 5000,
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    })
  }


}
