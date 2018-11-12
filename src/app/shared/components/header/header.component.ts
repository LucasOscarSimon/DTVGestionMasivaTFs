import { Component, OnInit } from '@angular/core';
import {GlobalEventsManager} from '../../../layout/services/global-events-manager';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public showHeader = false;

  constructor(
    private OGlobalEventsManager: GlobalEventsManager) {
    this.OGlobalEventsManager.showHeader.subscribe((mode: any) => {
      console.log(mode);
      this.showHeader = mode;
    });
  }

  ngOnInit() {
  }
}
