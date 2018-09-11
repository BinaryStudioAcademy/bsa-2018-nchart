import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html'
})
export class ButtonComponent implements OnInit {
	@Input()
	label = 'text';
	@Input()
	tooltip: string = null;
	@Input()
	tooltipPosition: 'top' | 'left' | 'bottom' | 'right' = 'right';
	@Input()
	icon: string;
	@Input()
	iconPosition: string;
	@Input()
	disabled: boolean;
	@Input()
	size: 'small' | 'middle' | 'big' = 'middle';
	@Input()
	type: 'default' | 'secondary' | 'icon' | 'danger' = 'default';
	@Output()
	onclick: EventEmitter<any> = new EventEmitter();
	@Input()
	loading = false;

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

	get loadingBackgroundColor(): string {
		const buttonTypeColors = {
			['default']: '#29166F',
			['secondary']: '#3ccc38',
			['icon']: '#29166F',
			['danger']: '#FD3259'
		};

		return buttonTypeColors[this.type];
	}
}
