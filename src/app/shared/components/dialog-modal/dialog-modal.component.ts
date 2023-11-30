import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private modal: NgbActiveModal ) {
   }
  
  ngOnInit(): void {
  }

  public onConfirm(){
    this.modal.close(true);
  }

  public onClose(){
    this.modal.close(false);
  }
  
}
