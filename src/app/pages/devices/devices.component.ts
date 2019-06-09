import {Component, OnDestroy} from '@angular/core';

@Component({
  selector: 'ngx-devices',
  styleUrls: ['./devices.component.scss'],
  templateUrl: './devices.component.html',
})
export class DevicesComponent implements OnDestroy {

  private alive = true;

  constructor() {
    // empty
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
