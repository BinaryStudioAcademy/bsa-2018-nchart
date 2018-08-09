import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-default-button',
	templateUrl: './default-button.html'
})
export class DefaultButtonComponent implements OnInit {
	@Input()
	label: string;
	@Input()
	icon: string;
	@Input()
	iconPosition: string;
	@Input()
	disabled: boolean;
	@Input()
	size;
	@Output() click = new EventEmitter();

	onClick() {
		this.click.emit();
	}

	constructor() {}

	ngOnInit() {}

	getClasses() {
		return {
			'ui-button-default': true,
			[`ui-button-${this.size}`]: true
		};
	}
}
