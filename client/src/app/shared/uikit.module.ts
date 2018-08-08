import { NgModule } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
	imports: [
		ButtonModule,
		PasswordModule,
		InputTextareaModule,
		InputTextModule,
		DropdownModule,
		CheckboxModule,
		AutoCompleteModule
	],
	exports: [
		ButtonModule,
		PasswordModule,
		InputTextareaModule,
		InputTextModule,
		DropdownModule,
		CheckboxModule,
		AutoCompleteModule
	],
	declarations: []
})
export class UIKitModule {}
