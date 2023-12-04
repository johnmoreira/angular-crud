import { Component } from '@angular/core';
import { ToastService } from './shared/components/toasts/services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {

  constructor(
        
    public toastService: ToastService
  ) {}
}