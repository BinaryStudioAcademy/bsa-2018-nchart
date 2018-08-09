import { NgModule } from '@angular/core';
import { UIKitModule } from '@app/shared/uikit.module';
import { ButtonComponent } from './components/button/button/button.component';
import { ActionButtonComponent } from './components/button/action-button/action-button.component';
import { FormFieldModule } from './components/form-field/form-field.module';

@NgModule({
	imports: [UIKitModule, FormFieldModule],
	exports: [
		ButtonComponent,
		ActionButtonComponent,
		FormFieldModule
	],
	declarations: [
		ButtonComponent,
		ActionButtonComponent
	]
})
export class SharedModule {}
