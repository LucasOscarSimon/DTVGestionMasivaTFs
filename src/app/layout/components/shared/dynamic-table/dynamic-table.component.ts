import { Component, OnInit, Input } from '@angular/core';
import { HeaderTable } from '../../../models/dynamic-table/header-table';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css']
})
export class DynamicTableComponent implements OnInit {

  @Input() loData: any[];
  @Input() loHeaderTable: HeaderTable[];

  constructor() { }

  ngOnInit() {
  }

}
