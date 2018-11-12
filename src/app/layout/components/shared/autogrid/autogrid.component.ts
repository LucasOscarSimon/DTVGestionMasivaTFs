import { Component, OnInit, Input } from '@angular/core';

class Header{
  Name:string;
  Id:number;

  constructor();
  constructor(name?:string, id?:number){
      this.Name = name == undefined ? "" : name;
      this.Id = id == undefined ? 0 : id;
  }
}

class Cell{
  Content: string;
  ColumnId: number;
  RowId: number;

  constructor(content?:string, columnId?: number, rowId?: number){
    this.Content = content == undefined ? "" : content;
    this.ColumnId = columnId == undefined ? 0 : columnId;
    this.RowId = rowId == undefined ? 0 : rowId;
  }

}

class Row{
  Cells: Cell[];
  RowId: number;
  constructor();
  constructor(cells?: Cell[], rowId?: number){
    this.Cells = cells.length == 0 ? new Cell[0] : cells;
    this.RowId = rowId == undefined ? 0 : rowId;
  }
}

class GridModel{
  Headers: Header[];
  Cells: Cell[];
  Rows: Row[];
  Valid: boolean;

  constructor();
  constructor(headers?: Header[], cells?: Cell[], rows?: Row[]){
    if(rows.length == 0){
      if(headers.length > 0){
        var headerRow:Row = new Row();
        headerRow.RowId = 0;

        headers.forEach( function(header) {
          var cell;
          cell = new Cell(header.Name,header.Id,header.Id);
          headerRow.Cells.push(cell);
        });
        
        this.Rows.push(headerRow);
      } else {
        if(cells.length > 0){
          cells.forEach(function(cell){
            
          });
        }
      }
    }
    this.Headers = headers.length == 0 ? new Header[0] : headers ; 
    this.Cells = cells.length == 0 ? new Cell[0] : cells;
    this.Rows = rows.length == 0 ? new Row[0] : rows; 
  }

  buildRows(cells:Cell[]){
    cells.forEach(cell => {
      
    });
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
