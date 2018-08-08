import { NgModule } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { SplitButtonModule } from 'primeng/splitbutton';
import {RouterTestingModule} from '@angular/router/testing';


@NgModule({
	imports: [	ButtonModule,
				SplitButtonModule,
				PasswordModule,
				RadioButtonModule,
				InputTextareaModule,
				InputTextModule,
				DropdownModule,
				CheckboxModule,
				RouterTestingModule
			],
	exports: [	ButtonModule,
				SplitButtonModule,
				PasswordModule,
				RadioButtonModule,
				InputTextareaModule,
				InputTextModule,
				DropdownModule,
				CheckboxModule,
				RouterTestingModule
			],
	declarations: []
})
export class UIKitModule {}
