import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { TabMenuModule } from 'primeng/tabmenu';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';

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
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
// Drag&Drop
import { DragulaModule } from 'ng2-dragula';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { DialogModule } from 'primeng/dialog';
import { GridsterModule } from 'angular-gridster2';

@NgModule({
	imports: [
		GridsterModule,
		DialogModule,
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
		ScrollToModule.forRoot(),
		DragulaModule.forRoot(),
		FormsModule,
		ReactiveFormsModule,
		TooltipModule,
		SpinnerModule,
		CardModule,
		TableModule,
		TieredMenuModule,
		PaginatorModule
	],
	exports: [
		GridsterModule,
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
		ScrollToModule,
		DragulaModule,
		FormsModule,
		ReactiveFormsModule,
		TooltipModule,
		SpinnerModule,
		CardModule,
		TableModule,
		TieredMenuModule,
		DialogModule,
		PaginatorModule
	],
	declarations: []
})
export class UIKitModule {}
