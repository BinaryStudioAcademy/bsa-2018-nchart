import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StoreService } from '@app/services/store.service';
import { Register } from '@app/models';
import { Register as RegisterAction } from '@app/store/actions/user/user.actions';

@Component({
	selector: 'app-register-form',
	templateUrl: './register-form.component.html',
	styleUrls: ['./register-form.component.sass']
})
export class RegisterFormComponent implements OnInit {
	@Input()
	registerForm: FormGroup;

	constructor(private storeService: StoreService) {}

	ngOnInit() {}

	initForm() {}

	onClickCreateProfile() {
		const {
			name,
			password,
			email
		} = this.registerForm.getRawValue() as Register;
		const user = new Register(name, email, password);

		this.storeService.dispatch(new RegisterAction({ user }));
	}
}
