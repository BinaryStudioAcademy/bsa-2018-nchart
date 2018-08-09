import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
// Forms
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { SplitButtonModule } from 'primeng/splitbutton';
import { RouterTestingModule } from '@angular/router/testing';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
	imports: [
		ButtonModule,
		SplitButtonModule,
		PasswordModule,
		InputTextareaModule,
		InputTextModule,
		DropdownModule,
		CheckboxModule,
		RouterTestingModule,
		CommonModule,
		BrowserAnimationsModule,
		BrowserModule,
		AutoCompleteModule,
		RadioButtonModule,
		InputSwitchModule
	],
	exports: [
		ButtonModule,
		SplitButtonModule,
		PasswordModule,
		InputTextareaModule,
		InputTextModule,
		DropdownModule,
		CheckboxModule,
		RouterTestingModule,
		CommonModule,
		BrowserAnimationsModule,
		BrowserModule,
		AutoCompleteModule,
		RadioButtonModule,
		InputSwitchModule
	],
	declarations: []
})
export class UIKitModule {}
