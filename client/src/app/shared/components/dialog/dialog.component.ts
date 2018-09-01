import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
	selector: 'app-dialog',
	templateUrl: './dialog.component.html'
})
export class DialogComponent implements OnInit {

	@Input()
	display: boolean;
	@Output() displayChange = new EventEmitter<boolean>();

	@Input()
	projectId: number;

	@Input()
	accessLevelId: number;

	// showDialog() {
	// 	this.display = true;
	// }

	close() {
		this.displayChange.emit(false);
	}

	ngOnInit() {
	}
}
