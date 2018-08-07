import { NgModule } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';

@NgModule({
	imports: [ButtonModule, PasswordModule],
	exports: [ButtonModule, PasswordModule],
	declarations: []
})
export class UIKitModule {}
