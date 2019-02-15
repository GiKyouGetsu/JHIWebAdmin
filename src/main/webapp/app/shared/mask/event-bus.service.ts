import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EventBusService {
    public eventBus: Subject<string> = new Subject<string>();
    constructor() {}

    sendCommand(command: string) {
        this.eventBus.next(command);
    }

    clearCommand() {
        this.eventBus.next();
    }

    getCommand(): Observable<any> {
        return this.eventBus.asObservable();
    }
}
