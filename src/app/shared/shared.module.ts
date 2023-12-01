import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModalComponent } from './components/dialog-modal/dialog-modal.component';
import { ToastGlobalComponent } from './components/toasts/toast-global/toast-global.component';
import { ToastsContainer } from './components/toasts/toasts-container/toasts-container.component';


@NgModule({
    declarations: [
        DialogModalComponent,
        
    ],
    imports: [
      CommonModule,
      ToastsContainer
    ],
    exports: [
        DialogModalComponent,

    ]
  })
  export class SharedModule { }