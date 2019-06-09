import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Gunshot} from "../model/gunshot";

@Injectable({
  providedIn: 'root'
})
export class GunshotService {

  listen(deviceId: number): Observable<Gunshot> {
    return null;
  }

  unlisten(deviceId: number): void {

  }

}
