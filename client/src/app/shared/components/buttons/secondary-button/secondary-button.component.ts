import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-secondary-button',
	templateUrl: './secondary-button.html'
})
export class SecondaryButtonComponent implements OnInit {

	@Input() label: string;
	@Input() icon: string;
	@Input() iconPosition: string;
	@Input() disabled: boolean;

	constructor() { }

	ngOnInit() {
	}

}
