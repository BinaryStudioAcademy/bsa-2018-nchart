import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import { ReactiveFormsModule } from '@angular/forms';
import { SecondaryButtonComponent } from './components/buttons/secondary-button.component';
import { DefaultButtonComponent } from './components/buttons/default-button.component';
import { InputPasswordComponent } from './components/inputs/input-password/input-password.component';
import { InputTextComponent } from './components/inputs/input-text/input-text.component';
import { DropdownSimpleComponent } from './components/dropdowns/dropdown-simple/dropdown-simple.component';
import { DropdownGroupComponent } from './components/dropdowns/dropdown-group/dropdown-group.component';
import { CheckboxComponent } from './components/checkbox/checkbox/checkbox.component';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';


@NgModule({
	imports: [	ButtonModule,
				PasswordModule,
				ReactiveFormsModule,
				BrowserAnimationsModule,
				BrowserModule,
				CommonModule,
				FormsModule,
				InputTextModule,
				DropdownModule,
				CheckboxModule
	],
	exports: [	SecondaryButtonComponent,
				DefaultButtonComponent,
				InputPasswordComponent,
				BrowserAnimationsModule,
				BrowserModule,
				InputTextComponent,
				DropdownSimpleComponent,
				DropdownGroupComponent,
				CheckboxComponent
	],
	declarations: [	SecondaryButtonComponent,
					DefaultButtonComponent,
					InputPasswordComponent,
					InputTextComponent,
					DropdownSimpleComponent,
					DropdownGroupComponent,
					CheckboxComponent
	]
})
export class SharedModule {}
