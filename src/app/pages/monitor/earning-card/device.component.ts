import {Component, Input} from '@angular/core';
import {Device} from '../../../gls/model/device';
import {Gunshot} from '../../../gls/model/gunshot';

@Component({
  selector: 'ngx-device-card',
  styleUrls: ['./device.component.scss'],
  templateUrl: './device.component.html',
})
export class DeviceComponent {

  @Input() device: Device;

  flipped = false;
  hasRecentGunshot = false;

  toggleFlipView() {
    this.flipped = !this.flipped;
  }

  handleGunshot(gunshot: Gunshot): void {
    this.hasRecentGunshot = true;
    setTimeout(() => this.hasRecentGunshot = false, 5000);
  }

}
