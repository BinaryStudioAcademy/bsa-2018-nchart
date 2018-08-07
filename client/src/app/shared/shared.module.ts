import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SecondaryButtonComponent } from '@app/shared/components/buttons/secondary-button.component';
import { DefaultButtonComponent } from '@app/shared/components/buttons/default-button.component';
import { RadioButtonComponent } from '@app/shared/components/input/radioButton/radio-button.component';
import { InputTextareaComponent } from '@app/shared/components/input/inputTextarea/input-textarea.component';

@NgModule({
	imports: [ButtonModule, RadioButtonModule, InputTextareaModule],
	exports: [
		SecondaryButtonComponent,
		DefaultButtonComponent,
		RadioButtonComponent,
		InputTextareaComponent
	],
	declarations: [
		SecondaryButtonComponent,
		DefaultButtonComponent,
		RadioButtonComponent,
		InputTextareaComponent
	]
})
export class SharedModule {}
