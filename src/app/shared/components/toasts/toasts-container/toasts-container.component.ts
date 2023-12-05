import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { ToastService } from '../services/toast.service';
import { Toast } from '../toast-model';

// declare var bootstrap: any;

@Component({
	selector: 'app-toasts',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './toasts-container.component.html',

})
export class ToastsContainer implements OnInit {

	public toastLive = document.getElementById('liveToast')!
	public toast = bootstrap.Toast.getOrCreateInstance(this.toastLive)

	constructor(
		public toastService: ToastService
	) {

	}

	@Output() dismiss: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Input() title: string = 'toast'
	@Input() message: string = 'mensagem'
	@Input() date: Date = new Date()
	@Input() toasts: Toast[] = [];

	ngOnInit(): void {

		var toastElList = [].slice.call(document.querySelectorAll('.toast'))
		var toastList = toastElList.map(function (toastEl) {
			return new bootstrap.Toast(toastEl)

		})
		toastList.forEach(toast =>
			toast.show())

			setTimeout(() => {
				this.dismiss.emit(true)
			}, 5000);
	}
}