import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-default-button',
	template: '<button pButton class="ui-button-default" label="{{label}}"></button>'
})
export class DefaultButtonComponent implements OnInit {
	@Input() label: string;

	constructor() { }

	ngOnInit() {
	}

}
