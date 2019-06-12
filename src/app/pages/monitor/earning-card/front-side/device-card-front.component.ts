import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import {Device} from '../../../../gls/model/device';
import {DeviceService} from '../../../../gls/services/device.service';
import {NGXLogger} from 'ngx-logger';
import {Gunshot} from '../../../../gls/model/gunshot';

@Component({
  selector: 'ngx-device-card-front',
  styleUrls: ['./device-card-front.component.scss'],
  templateUrl: './device-card-front.component.html',
})
export class DeviceCardFrontComponent implements OnInit, OnDestroy {
  private alive = true;

  @Input() device: Device;
  @Output() gunshot: EventEmitter<Gunshot> = new EventEmitter<Gunshot>();

  online = false;
  lastOnline = new Date();
  has = false;
  currentTheme: string;
  frequency: { value: [string, number] }[];
  lastGunshot: Gunshot = null;

  intervalId: any;

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
      this.online = true;
      this.lastOnline = new Date();
    });

    this.deviceService.gunshots(this.device.id).subscribe(g => {
      this.lastGunshot = g;
      this.gunshot.emit(this.lastGunshot);
      this.logger.debug('Last gunshot: ' + JSON.stringify(g));
    });

    this.intervalId = setInterval(() => {
      const now = new Date();
      if (now.getTime() - this.lastOnline.getTime() > 2000)
        this.online = false;
    }, 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

}
