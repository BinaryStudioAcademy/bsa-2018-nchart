import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html'
})
export class ButtonComponent implements OnInit {
	@Input() label: string;
	@Input() icon: string;
	@Input() iconPosition: string;
	@Input() disabled: boolean;
	@Input() size: string;
	@Input() type: string;
	@Output() click = new EventEmitter();

	onClick() {
		this.click.emit();
	}

	constructor() {}

	ngOnInit() {}

	getClasses() {
		return {
			'ui-button-default': true,
			[`ui-button-${this.size}`]: true,
			[`ui-button-${this.type}`]: true
		};
	}
}
