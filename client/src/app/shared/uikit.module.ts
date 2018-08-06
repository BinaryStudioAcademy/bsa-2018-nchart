import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
	imports: [ButtonModule, RadioButtonModule],
	exports: [ButtonModule, RadioButtonModule],
	declarations: []
})
export class UIKitModule {}
