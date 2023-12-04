import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, inject } from '@angular/core';

@Component({
	selector: 'app-toasts',
	standalone: true,
	imports: [ CommonModule ],
	templateUrl: './toasts-container.component.html',
	
})
export class ToastsContainer implements OnInit{
	@Output() closeHit: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Input() title: string = 'toast'
	@Input() message: string = 'mensagem'
	@Input() date:Date = new Date()
	
	ngOnInit(): void {}
}