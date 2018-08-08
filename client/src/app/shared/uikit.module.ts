import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
// Forms
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { SplitButtonModule } from 'primeng/splitbutton';
import { RouterTestingModule } from '@angular/router/testing';


@NgModule({
	imports: [	ButtonModule,
				SplitButtonModule,
				PasswordModule,
				RadioButtonModule,
				InputTextareaModule,
				InputTextModule,
				DropdownModule,
				CheckboxModule,
				RouterTestingModule,
				FormsModule,
				ReactiveFormsModule,
				CommonModule,
				BrowserAnimationsModule,
				BrowserModule
			],
	exports: [	ButtonModule,
				SplitButtonModule,
				PasswordModule,
				RadioButtonModule,
				InputTextareaModule,
				InputTextModule,
				DropdownModule,
				CheckboxModule,
				RouterTestingModule,
				FormsModule,
				ReactiveFormsModule,
				CommonModule,
				BrowserAnimationsModule,
				BrowserModule
			],
	declarations: []
})
export class UIKitModule {}
