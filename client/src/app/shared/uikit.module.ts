import { NgModule } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
	imports: [	ButtonModule,
				PasswordModule,
				RadioButtonModule,
				InputTextareaModule,
				InputTextModule,
				DropdownModule,
				CheckboxModule
			],
	exports: [	ButtonModule,
				PasswordModule,
				RadioButtonModule,
				InputTextareaModule,
				InputTextModule,
				DropdownModule,
				CheckboxModule
			],
	declarations: []
})
export class UIKitModule {}
