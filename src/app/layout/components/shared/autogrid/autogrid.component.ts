import { Component, OnInit, Input } from '@angular/core';

class Column{
  name:string;
  id:number;

  constructor();
  constructor(name?:string, id?:number){
      this.name = name == undefined ? "" : name;
      this.id = id == undefined ? 0 : id;
  }
}

class Cell{
  content: string;
  id: number;

  constructor();
  constructor(content?:string, id?:number){
    this.content = content == undefined ? "" : content;
    this.id = id == undefined ? 0 : id;
  }

}

class GridModel{
  columns: Column[];
  cells: Cell[]

  constructor();
  constructor(){
    
  }
}

@Component({
  selector: 'autogrid',
  templateUrl: './autogrid.component.html',
  styleUrls: ['./autogrid.component.css']
})



export class AutogridComponent implements OnInit {
  // @Input() gridData:GridModel;
  constructor() { }

  ngOnInit() {
  }

}
