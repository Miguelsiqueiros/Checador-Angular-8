import { Component, OnInit } from '@angular/core';

export interface EmployeeCheckIns {
  name: string;
  position: number;
  delay: number;
}

var ELEMENT_DATA: EmployeeCheckIns[]

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'delay'];
  dataSource = ELEMENT_DATA;
  toggle: boolean = true;

  constructor() { }

  ngOnInit() {
    this.dataSource = ELEMENT_DATA;
  }

  toggleRanking(){
    console.log(this.toggle);
    console.log(ELEMENT_DATA);
    if(this.toggle == true){
      document.getElementById("title").textContent = "Weekly Ranking"
      ELEMENT_DATA = [
        { position: 1, name: 'Antonio Nevarez', delay: 0},
        { position: 2, name: 'Jemmy Preciado', delay: 1},
        { position: 3, name: 'Ernesto Vera', delay: 2},
        { position: 4, name: 'Carlos Rondero', delay: 3},
        { position: 5, name: 'Jesus Campos', delay: 5},
        { position: 6, name: 'Felipe Padilla', delay: 6},
        { position: 7, name: 'Luis Maldonado', delay: 6},
        { position: 8, name: 'Pedro Esparza', delay: 7},
        { position: 9, name: 'Miguel Siqueiros', delay: 8},
        { position: 10, name: 'Alfa Venegas', delay: 9},
      ];
    }
    else{
      document.getElementById("title").textContent = "Daily Ranking"
      ELEMENT_DATA = [
        { position: 1, name: 'Antonio Nevarez', delay: 0},
        { position: 2, name: 'Jemmy Preciado', delay: 15},
        { position: 3, name: 'Ernesto Vera', delay: 26},
        { position: 4, name: 'Carlos Rondero', delay: 39},
        { position: 5, name: 'Jesus Campos', delay: 52},
        { position: 6, name: 'Felipe Padilla', delay: 62},
        { position: 7, name: 'Luis Maldonado', delay: 68},
        { position: 8, name: 'Pedro Esparza', delay: 76},
        { position: 9, name: 'Miguel Siqueiros', delay: 83},
        { position: 10, name: 'Alfa Venegas', delay: 92},
      ];
    }
    this.ngOnInit();
   this.toggle = !this.toggle;
  }
}
