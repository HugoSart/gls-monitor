/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import {WebSocketService} from './gls/services/web-socket.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService, private ws: WebSocketService) {
    // empty
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.ws.connect('ws://localhost:55556/');
  }
}
