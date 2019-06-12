import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import {NGXLogger} from 'ngx-logger';
import {Message} from '../model/message';
import {Observable, Observer, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {

  ws: WebSocket;
  message$: Subject<Message>;

  private subject: Subject<MessageEvent>;

  constructor(private logger: NGXLogger) {
    // empty
  }

  public connect(url): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      this.subject.asObservable().subscribe(m => this.message$.next(JSON.parse(m.data) as Message));
      this.message$ = new Subject();
      this.logger.info(`Successfully connected: ${url}`);
    }
    return this.subject;
  }

  public send(message: Message): void {
    this.ws.send(JSON.stringify(message));
  }

  private create(url): Subject<MessageEvent> {
    this.ws = new WebSocket(url);

    const observable = Observable.create((obs: Observer<MessageEvent>) => {
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
    return Subject.create(observer, observable);
  }

}
