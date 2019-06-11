import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Device} from '../model/device';
import {WebSocketService} from './web-socket.service';
import {Message} from '../model/message';
import {Frequency} from '../model/frequency';
import {NGXLogger} from 'ngx-logger';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {

  constructor(private logger: NGXLogger, private client: WebSocketService) {
    // empty
  }

  add(device: Device): void {
    this.client.send(new Message('device.add', device));
  }

  delete(device: Device): void {
    this.client.send(new Message('device.delete', device));
  }

  update(device: Device): void {
    this.client.send(new Message('device.update', device));
  }

  fetch(): Observable<Device[]> {
    const sub: Subject<Device[]> = new Subject();
    this.client.listen().subscribe(m => {
      if (m.destination === 'response/device.fetch') {
        sub.next(JSON.parse(m.body) as Device[]);
        sub.complete();
      }
    });
    this.client.send(new Message('device.fetch'));
    return sub;
  }

  frequencies(deviceId: number): Observable<Frequency> {
    const sub: Subject<Frequency> = new Subject();
    this.client.listen().subscribe(m => {
      if (m.destination === 'topic/device.frequency') {
        const frequency = JSON.parse(m.body) as Frequency;
        // if (frequency.deviceId === deviceId)
          sub.next(frequency);
      }
    });
    return sub;
  }

}
