import {Component, OnInit} from '@angular/core';
import {Device} from '../../gls/model/device';
import {DeviceService} from '../../gls/services/device.service';

@Component({
  selector: 'ngx-monitor',
  templateUrl: './monitor.component.html',
})
export class MonitorComponent implements OnInit {

  devices: Device[] = [];

  constructor(private deviceService: DeviceService) {
    // empty
  }

  ngOnInit(): void {
    this.deviceService.fetch().subscribe(devices => this.devices = devices);
  }

}
