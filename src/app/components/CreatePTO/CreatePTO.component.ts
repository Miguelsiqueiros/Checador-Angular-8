import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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

  constructor() { }
  ngOnInit() {
    
  }

}
