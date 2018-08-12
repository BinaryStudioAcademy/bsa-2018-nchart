import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button/button.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { CheckboxComponent } from './checkbox/checkbox/checkbox.component';
import { CheckboxGroupComponent } from './checkbox/checkbox-group/checkbox-group.component';
import { InputTextComponent } from './input-text/input-text.component';
import { ToggleComponent } from './toggle/toggle.component';
import { DropdownSimpleComponent } from './dropdown/dropdown-simple/dropdown-simple.component';
import { RadioButtonComponent } from './checkbox/radioButton/radio-button.component';
import { InputTextareaComponent } from '@app/shared/components/form-field/input-textarea/input-textarea.component';
import { UIKitModule } from '@app/shared/uikit.module';

const formFieldComponents = [
	ButtonComponent,
	AutocompleteComponent,
	CheckboxComponent,
	CheckboxGroupComponent,
	InputTextComponent,
	InputTextareaComponent,
	ToggleComponent,
	DropdownSimpleComponent,
	RadioButtonComponent
];

@NgModule({
	imports: [FormsModule, ReactiveFormsModule, UIKitModule],
	declarations: formFieldComponents,
	exports: formFieldComponents
})
export class FormFieldModule {}
