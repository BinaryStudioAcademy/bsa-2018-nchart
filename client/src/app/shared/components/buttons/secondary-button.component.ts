import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-secondary-button',
	template: '<button pButton class="ui-button-secondary" label="{{label}}"></button>'
})
export class SecondaryButtonComponent implements OnInit {

	@Input() label: string;

	constructor() { }

	ngOnInit() {
	}

}
