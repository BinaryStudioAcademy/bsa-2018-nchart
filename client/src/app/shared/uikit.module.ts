import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
	imports: [ButtonModule, RadioButtonModule, InputTextareaModule],
	exports: [ButtonModule, RadioButtonModule, InputTextareaModule],
	declarations: []
})
export class UIKitModule {}
