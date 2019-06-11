import {Component, Input} from '@angular/core';
import {Device} from '../../../gls/model/device';

@Component({
  selector: 'ngx-device-card',
  styleUrls: ['./device.component.scss'],
  templateUrl: './device.component.html',
})
export class DeviceComponent {

  @Input() device: Device;
  flipped = false;

  toggleFlipView() {
    this.flipped = !this.flipped;
  }
}
