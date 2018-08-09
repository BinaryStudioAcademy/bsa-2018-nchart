import { NgModule } from '@angular/core';
import { UIKitModule } from './uikit.module';
// Buttons
import { SecondaryButtonComponent } from './components/buttons/secondary-button/secondary-button.component';
import { DefaultButtonComponent } from './components/buttons/default-button/default-button.component';
import { ActionButtonComponent } from './components/buttons/action-button/action-button.component';
import { ToolButtonComponent } from './components/buttons/tool-button/tool-button.component';
// Inputs
import { InputTextComponent } from './components/input/input-text/input-text.component';
import { InputTextareaComponent } from './components/input/inputTextarea/input-textarea.component';
// Dropdowns
import { DropdownSimpleComponent } from './components/dropdowns/dropdown-simple/dropdown-simple.component';
import { DropdownGroupComponent } from './components/dropdowns/dropdown-group/dropdown-group.component';
// Checkbox
import { CheckboxComponent } from './components/checkbox/checkbox/checkbox.component';
import { CheckboxGroupComponent } from './components/checkbox/checkbox-group/checkbox-group.component';
// RadioButtons
import { RadioButtonComponent } from './components/input/radioButton/radio-button.component';
// Autocomplete
import { AutocompleteComponent } from './components/input/autocomplete/autocomplete.component';
// Toggle
import { ToggleComponent } from './components/input/toggle/toggle.component';

@NgModule({
	imports: [UIKitModule],
	exports: [
		SecondaryButtonComponent,
		DefaultButtonComponent,
		ToolButtonComponent,
		ActionButtonComponent,
		InputTextComponent,
		DropdownSimpleComponent,
		DropdownGroupComponent,
		CheckboxComponent,
		CheckboxGroupComponent,
		RadioButtonComponent,
		InputTextareaComponent,
		AutocompleteComponent,
		ToggleComponent
	],
	declarations: [
		SecondaryButtonComponent,
		DefaultButtonComponent,
		ActionButtonComponent,
		ToolButtonComponent,
		InputTextComponent,
		DropdownSimpleComponent,
		DropdownGroupComponent,
		CheckboxComponent,
		CheckboxGroupComponent,
		RadioButtonComponent,
		InputTextareaComponent,
		AutocompleteComponent,
		ToggleComponent
	]
})
export class SharedModule {}
