import { ToastInfo } from './toast.model';
import { Component, Input } from '@angular/core';
import { AlertModalService } from '../../alert-modal.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})


export class NotificationComponent {
  toasts: ToastInfo[] = [];
  
  constructor(public toastService: AlertModalService ){ 
  }
}
