import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css', '../dashboard/dashboard.component.css']
})
export class CardComponent implements OnInit {
  @Input() title: String;
  @Input() name: String;
  @Input() arrayData: String[];
  @Input() colorClass: String;
  
  constructor() { }

  ngOnInit() {
    
  }

}
