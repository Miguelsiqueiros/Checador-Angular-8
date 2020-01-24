import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CheckInService } from 'src/app/Services/checkIn.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit {
  constructor(private _snackBar: MatSnackBar, private checkInObject: CheckInService) { }
  pinValue: number;
  time = new Date();
  newCheck: any;
  ngOnInit() {
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  SubmitData() {
    this.checkInObject.checkIn(this.pinValue).subscribe(response => {
      this.newCheck = response;
      this.SuccessMessage(this.newCheck.name, this.newCheck.date);
    }, error => { });;
    this.pinValue = null;
  }

  SuccessMessage(name: string, date: Date) {
    this._snackBar.open("Welcome " + name + ", you succesfully checked in at " + date.toString(), "Got It", {
      duration: 4000,
    })
  }

  WrongPinMessage() {
    this._snackBar.open("The PIN you entered doesn't exist", "", {
      duration: 2000,
    })
  }

  AlreadyCheckedMessage() {
    this._snackBar.open("User already checked in", "", {
      duration: 2000,
    })
  }


}
