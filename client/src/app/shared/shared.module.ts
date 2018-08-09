import { NgModule } from '@angular/core';
import { UIKitModule } from '@app/shared/uikit.module';
import { SecondaryButtonComponent } from './components/button/secondary-button/secondary-button.component';
import { DefaultButtonComponent } from './components/button/default-button/default-button.component';
import { ToolButtonComponent } from './components/button/tool-button/tool-button.component';
import { ActionButtonComponent } from './components/button/action-button/action-button.component';
import { FormFieldModule } from './components/form-field/form-field.module';

@NgModule({
	imports: [UIKitModule, FormFieldModule],
	exports: [
		SecondaryButtonComponent,
		DefaultButtonComponent,
		ToolButtonComponent,
		ActionButtonComponent,
		FormFieldModule
	],
	declarations: [
		SecondaryButtonComponent,
		DefaultButtonComponent,
		ActionButtonComponent,
		ToolButtonComponent
	]
})
export class SharedModule {}
