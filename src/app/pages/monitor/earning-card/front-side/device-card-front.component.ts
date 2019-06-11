import {Component, Input, OnInit} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import {Device} from '../../../../gls/model/device';
import {DeviceService} from '../../../../gls/services/device.service';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'ngx-device-card-front',
  styleUrls: ['./device-card-front.component.scss'],
  templateUrl: './device-card-front.component.html',
})
export class DeviceCardFrontComponent implements OnInit {
  private alive = true;

  @Input() device: Device;

  currentTheme: string;
  frequency: { value: [string, number] }[];

  constructor(private logger: NGXLogger, private themeService: NbThemeService, private deviceService: DeviceService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
      });
  }

  ngOnInit(): void {
    this.deviceService.frequencies(this.device.id).subscribe(f => {
      this.frequency = [];
      f.values.forEach((v, i) => {
        let x = '20';
        if (i <= 9) x += '0' + i;
        else x += '' + i;
        this.frequency.push({value: [x, v]});
      });
    });
  }

}
