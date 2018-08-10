import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface ActioButtonItem {
	label: string;
	icon?: string;
	command?: any;
	url?: any;
	routerLink?: any;
}

@Component({
	selector: 'app-button-action',
	templateUrl: './action-button.component.html'
})
export class ActionButtonComponent implements OnInit {
	@Input() checked: string;
	@Input() disabled: boolean;
	@Input() label: string;
	@Input() items: ActioButtonItem[];
	@Output() click = new EventEmitter();

	onClick() {
		this.click.emit();
	}

	constructor() {}

	ngOnInit() {}
}
