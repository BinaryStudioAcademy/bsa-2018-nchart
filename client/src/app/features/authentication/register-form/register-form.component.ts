import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Register } from '@app/models';

@Component({
	selector: 'app-register-form',
	templateUrl: './register-form.component.html',
	styleUrls: ['./register-form.component.sass']
})
export class RegisterFormComponent implements OnInit {
	@Input()
	registerForm: FormGroup;

	@Output()
	registerClick = new EventEmitter<Register>();

	constructor() {}

	ngOnInit() {}

	initForm() {}

	onClickCreateProfile() {
		const {
			name,
			password,
			email
		} = this.registerForm.getRawValue() as Register;

		this.registerClick.emit({ name, password, email });
	}
}
