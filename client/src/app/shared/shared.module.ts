import { NgModule } from '@angular/core';
import { UIKitModule } from '@app/shared/uikit.module';
// Buttons
import { SecondaryButtonComponent } from '@app/shared/components/buttons/secondary-button/secondary-button.component';
import { DefaultButtonComponent } from '@app/shared/components/buttons/default-button/default-button.component';
import { ActionButtonComponent } from '@app/shared/components/buttons/action-button/action-button.component';
import { ToolButtonComponent } from '@app/shared/components/buttons/tool-button/tool-button.component';
// Inputs
import { InputTextComponent } from '@app/shared/components/input/input-text/input-text.component';
import { InputTextareaComponent } from './components/input/inputTextarea/input-textarea.component';
// Dropdowns
import { DropdownSimpleComponent } from '@app/shared/components/dropdowns/dropdown-simple/dropdown-simple.component';
import { DropdownGroupComponent } from '@app/shared/components/dropdowns/dropdown-group/dropdown-group.component';
// Checkbox
import { CheckboxComponent } from './components/checkbuttons/checkbox/checkbox.component';
import { CheckboxGroupComponent } from './components/checkbuttons/checkbox-group/checkbox-group.component';
// RadioButtons
import { RadioButtonComponent } from './components/checkbuttons/radioButton/radio-button.component';
// Autocomplete
import { AutocompleteComponent } from '@app/shared/components/input/autocomplete/autocomplete.component';
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
