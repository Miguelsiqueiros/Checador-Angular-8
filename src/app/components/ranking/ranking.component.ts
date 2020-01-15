import { Component, OnInit } from '@angular/core';

export interface EmployeeCheckIns {
  name: string;
  position: number;
  delay: number;
}

const ELEMENT_DATA: EmployeeCheckIns[] = [
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



@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'delay'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit() {
  }

}
