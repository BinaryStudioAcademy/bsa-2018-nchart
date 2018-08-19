import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StoreService } from '@app/services/store.service';
import { Login as LoginAction } from '@app/store/actions/user/user.actions';
import { Login } from '@app/models';

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.sass']
})
export class LoginFormComponent implements OnInit {
	@Input()
	loginForm: FormGroup;

	constructor(private storeService: StoreService) {}

	ngOnInit() {}

	onClickLogin() {
		const { password, email } = this.loginForm.getRawValue() as Login;
		const user = new Login(email, password);

		this.storeService.dispatch(new LoginAction({ user }));
	}
}
