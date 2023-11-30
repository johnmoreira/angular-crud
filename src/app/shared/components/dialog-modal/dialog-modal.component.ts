import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.css']
})
export class DialogModalComponent implements OnInit {
  @Input() title!: string;
  @Input() msg!: string;
  @Input() cancelTxt = 'Cancelar';
  @Input() okTxt = 'Ok';
  
  public modal!: NgbModalRef 
  
  confirmResult!: Subject<boolean>;

  constructor( ) {
   }
  
  ngOnInit(): void {
    this.confirmResult = new Subject();
  }

  onConfirm(){
    this.confirmAndClose(true);
  }

  onClose(){
    this.confirmAndClose(false);  
  }

  private confirmAndClose(value: boolean) {
    this.confirmResult.next(value);
    this.modal.close(value)
  }
}
