import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModalComponent } from './components/dialog-modal/dialog-modal.component';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
    declarations: [
        DialogModalComponent,
        NotificationComponent,
    ],
    imports: [
      CommonModule,
    ],
    exports: [
        DialogModalComponent,
        NotificationComponent,
    ]
  })
  export class SharedModule { }