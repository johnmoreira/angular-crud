import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DialogModalComponent } from './components/dialog-modal/dialog-modal.component';

let modalRef!: NgbModalRef;

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor( private _modalService: NgbModal) { }

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
