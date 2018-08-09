import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { CheckboxComponent } from './checkbox/checkbox/checkbox.component';
import { CheckboxGroupComponent } from './checkbox/checkbox-group/checkbox-group.component';
import { InputTextComponent } from './input-text/input-text.component';
import { InputTextareaComponent } from './inputTextarea/input-textarea.component';
import { ToggleComponent } from './toggle/toggle.component';
import { DropdownSimpleComponent } from './dropdown/dropdown-simple/dropdown-simple.component';
import { DropdownGroupComponent } from './dropdown/dropdown-group/dropdown-group.component';
import { UIKitModule } from '../../uikit.module';

const formFieldComponents = [
	AutocompleteComponent,
	CheckboxComponent,
	CheckboxGroupComponent,
	InputTextComponent,
	InputTextareaComponent,
	ToggleComponent,
	DropdownGroupComponent,
	DropdownSimpleComponent
];

@NgModule({
	imports: [
		UIKitModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: formFieldComponents,
	exports: formFieldComponents
})
export class FormFieldModule {}
