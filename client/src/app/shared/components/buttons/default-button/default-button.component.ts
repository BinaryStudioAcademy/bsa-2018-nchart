import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-default-button',
	templateUrl: './default-button.html'
})
export class DefaultButtonComponent implements OnInit {

	@Input() label: string;
	@Input() icon: string;
	@Input() iconPosition: string;
	@Input() disabled: boolean;

	constructor() { }

	ngOnInit() {
	}

}
