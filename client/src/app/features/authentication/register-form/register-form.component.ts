import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { requiredValidator } from '@app/shared/components/form-field/form-validators';

@Component({
	selector: 'app-register-form',
	templateUrl: './register-form.component.html',
	styleUrls: ['./register-form.component.sass']
})
export class RegisterFormComponent implements OnInit {
	registerForm: FormGroup;

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit() {
		this.initForm();
	}

	initForm() {
		this.registerForm = this.formBuilder.group({
			name: new FormControl('', [requiredValidator('Field is required')]),
			email: new FormControl('', [
				requiredValidator('Field is required')
			]),
			password: new FormControl('', [
				requiredValidator('Field is required')
			]),
			confirmPassword: new FormControl('', [
				requiredValidator('Field is required')
			])
		});
	}
}
