import {Component, OnInit, Input} from '@angular/core';

@Component({
	selector: 'app-dialog',
	templateUrl: './dialog.component.html'
})
export class DialogComponent implements OnInit {
	display = false;

	@Input()
	projectId: number;

	showDialog() {
		this.display = true;
	}

	ngOnInit() {

	}
}
