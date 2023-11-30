import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModalComponent } from './components/dialog-modal/dialog-modal.component';

@NgModule({
    declarations: [
        DialogModalComponent,
    ],
    imports: [
      CommonModule,
    ],
    exports: [
        DialogModalComponent,
    ]
  })
  export class SharedModule { }