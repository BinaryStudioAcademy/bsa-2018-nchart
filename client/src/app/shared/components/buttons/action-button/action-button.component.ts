import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-action-button',
	templateUrl: './action-button.html'
})
export class ActionButtonComponent implements OnInit {

	@Input() checked: string;
	@Input() disabled: boolean;
	@Input() label: string;
	@Input() items: Object[];

	constructor() {}

	ngOnInit() {
	}

}
