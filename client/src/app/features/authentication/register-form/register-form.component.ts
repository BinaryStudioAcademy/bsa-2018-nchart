import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-register-form',
	templateUrl: './register-form.component.html',
	styleUrls: ['./register-form.component.sass']
})
export class RegisterFormComponent implements OnInit {
	@Input()
	registerForm: FormGroup;

	constructor() {}

	ngOnInit() {}

	initForm() {}

	onClickCreateProfile() {}
}
