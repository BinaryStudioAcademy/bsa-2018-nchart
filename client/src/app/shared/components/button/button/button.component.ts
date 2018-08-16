import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html'
})
export class ButtonComponent implements OnInit {
	@Input()
	label = 'text';
	@Input()
	icon: string;
	@Input()
	iconPosition: string;
	@Input()
	disabled: boolean;
	@Input()
	size: 'small' | 'middle' | 'big' = 'middle';
	@Input()
	type: 'default' | 'secondary' = 'default';
	@Output()
	onclick: EventEmitter<any> = new EventEmitter();

	constructor() {}

	ngOnInit() {}

	onClick(e) {
		this.onclick.emit(e);
	}

	getClasses() {
		return {
			'ui-button-default': true,
			[`ui-button-${this.size}`]: true,
			[`ui-button-${this.type}`]: true
		};
	}
}
