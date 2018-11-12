import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class GlobalEventsManager {
    public showHeader: EventEmitter<any> = new EventEmitter();
}
