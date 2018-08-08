import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-default-button',
	templateUrl: './tool-button.html'
})
export class ToolButtonComponent implements OnInit {

	@Input() label: string;
	@Input() icon: string;
	@Input() iconPosition: string;
	@Input() disabled: boolean;
	@Input() size;

	constructor() { }

	ngOnInit() {
	}

}
