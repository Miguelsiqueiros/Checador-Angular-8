import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar) { }

  time = new Date();
  ngOnInit() {
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  SuccessMessage(){
    this._snackBar.open("Succesfully Checked In", "Got It", {
      duration: 4000,
    })
  }

  WrongPinMessage(){
    this._snackBar.open("The PIN you entered doesn't exist", "", {
      duration: 2000,
    })
  }

  AlreadyCheckedMessage(){
    this._snackBar.open("User already checked in", "", {
      duration: 2000,
    })
  }


}
