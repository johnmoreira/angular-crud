import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DialogModalComponent } from './components/dialog-modal/dialog-modal.component';
import { ToastInfo } from './components/notification/toast.model';

let modalRef!: NgbModalRef;

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {
  toasts: ToastInfo[] = [];


  constructor( private _modalService: NgbModal) { }
  
  public showNotification(header: string, body: string) {
    this.toasts.push({ header, body })
  }

  public removeNotification(toast: ToastInfo) {
    this.toasts = this.toasts.filter(t => t != toast);
  }
  
  public clear() {
		this.toasts.splice(0, this.toasts.length);
	}
  
  public showConfirm(title: string, msg: string, okTxt?: string, cancelTxt?: string): Promise<boolean> {
    modalRef = this._modalService.open(DialogModalComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.msg = msg;

    if(okTxt){
      modalRef.componentInstance.okTxt = okTxt;
    }

    if(cancelTxt) {
      modalRef.componentInstance.cancelTxt = cancelTxt;
    }

    return modalRef.result
  }
}
