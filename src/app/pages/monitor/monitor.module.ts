import {NgModule} from '@angular/core';
import {NgxEchartsModule} from 'ngx-echarts';
import {NgxChartsModule} from '@swimlane/ngx-charts';

import {ThemeModule} from '../../@theme/theme.module';
import {MonitorComponent} from './monitor.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {DeviceComponent} from './earning-card/device.component';
import {DeviceCardFrontComponent} from './earning-card/front-side/device-card-front.component';
import {DeviceCardBackComponent} from './earning-card/back-side/device-card-back.component';
import {DeviceLiveFrequencyChartComponent} from './earning-card/front-side/device-live-frequency-chart.component';
import {EarningPieChartComponent} from './earning-card/back-side/earning-pie-chart.component';

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    NgxChartsModule,
    LeafletModule,
  ],
  declarations: [
    MonitorComponent,
    DeviceComponent,
    DeviceCardFrontComponent,
    DeviceCardBackComponent,
    DeviceLiveFrequencyChartComponent,
    EarningPieChartComponent,
  ],
})
export class MonitorModule {
}
