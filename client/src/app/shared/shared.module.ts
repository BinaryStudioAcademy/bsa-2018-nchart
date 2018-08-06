import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SecondaryButtonComponent } from './components/buttons/secondary-button.component';
import { DefaultButtonComponent } from './components/buttons/default-button.component';
import { RadioButtonComponent } from './components/input/radioButton/radio-button.component';

@NgModule({
	imports: [ButtonModule, RadioButtonModule],
	exports: [
		SecondaryButtonComponent,
		DefaultButtonComponent,
		RadioButtonComponent
	],
	declarations: [
		SecondaryButtonComponent,
		DefaultButtonComponent,
		RadioButtonComponent
	]
})
export class SharedModule {}
