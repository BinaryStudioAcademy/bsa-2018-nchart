import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { TabMenuModule } from 'primeng/tabmenu';

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
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToolbarModule } from 'primeng/toolbar';
import { TabViewModule } from 'primeng/tabview';
import { SpinnerModule } from 'primeng/spinner';
import { DragulaModule } from 'ng2-dragula';
import { TooltipModule } from 'primeng/tooltip';

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
		InputSwitchModule,
		ToolbarModule,
		TabMenuModule,
		TabViewModule,
		DragulaModule.forRoot(),
		FormsModule,
		ReactiveFormsModule,
		TooltipModule,
		SpinnerModule
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
		InputSwitchModule,
		ToolbarModule,
		TabMenuModule,
		TabViewModule,
		DragulaModule,
		FormsModule,
		ReactiveFormsModule,
		TooltipModule,
		SpinnerModule
	],
	declarations: []
})
export class UIKitModule {}
