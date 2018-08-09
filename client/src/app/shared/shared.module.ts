import { NgModule } from '@angular/core';
import { UIKitModule } from './uikit.module';
// Buttons
import { SecondaryButtonComponent } from './components/buttons/secondary-button/secondary-button.component';
import { DefaultButtonComponent } from './components/buttons/default-button/default-button.component';
import { ActionButtonComponent } from './components/buttons/action-button/action-button.component';
import { ToolButtonComponent } from './components/buttons/tool-button/tool-button.component';
// Inputs
import { InputTextComponent } from './components/inputs/input-text/input-text.component';
import { InputTextareaComponent } from './components/inputs/inputTextarea/input-textarea.component';
// Dropdowns
import { DropdownSimpleComponent } from './components/dropdowns/dropdown-simple/dropdown-simple.component';
import { DropdownGroupComponent } from './components/dropdowns/dropdown-group/dropdown-group.component';
// Check
import { CheckboxComponent } from './components/checkbuttons/checkbox/checkbox.component';
import { CheckboxGroupComponent } from './components/checkbuttons/checkbox-group/checkbox-group.component';
import { RadioButtonComponent } from './components/checkbuttons/radioButton/radio-button.component';
// import { ToggleComponent } from './components/checkbuttons/toggle/toggle.component';

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
		// ToggleComponent
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
		// ToggleComponent
	]
})
export class SharedModule {}
