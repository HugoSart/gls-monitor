import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Device} from '../model/device';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {

  add(): void {

  }

  delete(): void {

  }

  update(): void {

  }

  get(deviceId: number): Device {
    return null;
  }

  fetch(): Observable<Device[]> {
    return null;
  }

}
