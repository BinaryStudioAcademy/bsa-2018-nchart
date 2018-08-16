import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@app/shared/components/button/button/button.component';
import { AutocompleteComponent } from '@app/shared/components/form-field/autocomplete/autocomplete.component';
import { CheckboxComponent } from '@app/shared/components/form-field/checkbox/checkbox/checkbox.component';
import { CheckboxGroupComponent } from '@app/shared/components/form-field/checkbox/checkbox-group/checkbox-group.component';
import { InputTextComponent } from '@app/shared/components/form-field/input-text/input-text.component';
import { ToggleComponent } from '@app/shared/components/form-field/toggle/toggle.component';
import { DropdownSimpleComponent } from '@app/shared/components/form-field/dropdown/dropdown-simple/dropdown-simple.component';
import { RadioButtonComponent } from '@app/shared/components/form-field/checkbox/radioButton/radio-button.component';
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
