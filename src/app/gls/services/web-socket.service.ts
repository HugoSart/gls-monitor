import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import {NGXLogger} from 'ngx-logger';
import {Message} from '../model/message';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {

  private subject: Rx.Subject<MessageEvent>;
  private ws: WebSocket;

  constructor(private logger: NGXLogger) {
    // empty
  }

  public connect(url): Rx.Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      this.logger.info(`Successfully connected: ${url}`);
    }
    return this.subject;
  }

  public send(message: Message): void {
    this.ws.send(JSON.stringify(message));
  }

  public listen(): Observable<Message> {
    return this.subject.asObservable().pipe(map(m => JSON.parse(m.data) as Message));
  }

  private create(url): Rx.Subject<MessageEvent> {
    this.ws = new WebSocket(url);

    const observable = Rx.Observable.create((obs: Rx.Observer<MessageEvent>) => {
      this.ws.onmessage = obs.next.bind(obs);
      this.ws.onerror = obs.error.bind(obs);
      this.ws.onclose = obs.complete.bind(obs);
      return this.ws.close.bind(this.ws);
    });
    const observer = {
      next: (data: Object) => {
        if (this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify(data));
        }
      },
    };
    return Rx.Subject.create(observer, observable);
  }

}
