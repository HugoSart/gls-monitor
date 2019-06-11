import {Component, OnInit} from '@angular/core';

import { SmartTableData } from '../../../@core/data/smart-table';
import {NGXLogger} from 'ngx-logger';
import {DeviceService} from '../../../gls/services/device.service';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class SmartTableComponent implements OnInit {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      latitude: {
        title: 'Latitude',
        type: 'number',
      },
      longitude: {
        title: 'Longitude',
        type: 'number',
      },
    },
  };

  devices: any = [];

  constructor(private logger: NGXLogger, private service: SmartTableData, private deviceService: DeviceService) {
    // empty
  }

  ngOnInit(): void {
    this.deviceService.fetch().subscribe(devices => {
      this.logger.debug('Fetched devices: ' + JSON.stringify(devices));
      this.devices = devices;
    });
  }

  onCreateConfirm(event): void {
    this.logger.debug('onCreateConfirm called');
    if (window.confirm('Você tem certeza que quer inserir?')) {
      event.confirm.resolve();
      this.deviceService.add(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event): void {
    if (window.confirm('Você tem certeza que quer editar?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onDeleteConfirm(event): void {
    this.logger.info('onDeleteConfirm called');
    if (window.confirm('Você tem certeza que quer deletar?')) {
      event.confirm.resolve();
      this.deviceService.delete(event.data);
    } else {
      event.confirm.reject();
    }
  }

}
