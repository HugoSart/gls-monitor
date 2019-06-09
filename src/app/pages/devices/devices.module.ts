import { NgModule } from '@angular/core';

import {DevicesComponent} from './devices.component';
import {SmartTableComponent} from "./smart-table/smart-table.component";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {ThemeModule} from "../../@theme/theme.module";
import {TablesRoutingModule} from "../tables/tables-routing.module";

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    DevicesComponent,
    SmartTableComponent
  ],
})
export class DevicesModule { }
