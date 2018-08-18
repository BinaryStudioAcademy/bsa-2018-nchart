import { storiesOf, moduleMetadata, addDecorator } from '@storybook/angular';
import '@storybook/addon-notes/register';
import { withNotes } from '@storybook/addon-notes';
// Forms
import { FormsModule, MinLengthValidator } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Buttons
import { ButtonModule } from 'primeng/button';
import { ButtonComponent } from '../app/shared/components/button/button/button.component';
// Inputs
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
// Toggle
import { InputSwitchModule } from 'primeng/inputswitch';
import {TooltipModule} from 'primeng/tooltip';
// Autocomplete
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextComponent } from '../app/shared/components/form-field/input-text/input-text.component';
import { AutocompleteComponent } from '../app/shared/components/form-field/autocomplete/autocomplete.component';
import { ToggleComponent } from '../app/shared/components/form-field/toggle/toggle.component';
import { requiredValidator } from '../app/shared/components/form-field/form-validators';
import { minLengthValidator } from '../app/shared/components/form-field/form-validators';
import { InputTextareaComponent } from '../app/shared/components/form-field/input-textarea/input-textarea.component';

export const control2 = new FormControl('', [
	requiredValidator('Password is required'),
	minLengthValidator('Min length', 6)
]);

export const control1 = new FormControl('', [
	requiredValidator('Name is required'),
	minLengthValidator('Min length', 3)
]);

addDecorator(withNotes);

export const items: string[] = [
	'Audi',
	'BMW',
	'Fiat',
	'Ford',
	'Honda',
	'Jaguar',
	'Mercedes',
	'Renault',
	'Volvo',
	'VW'
];
storiesOf('Input fields', module)
	.addDecorator(
		moduleMetadata({
			imports: [
				InputTextModule,
				FormsModule,
				ReactiveFormsModule,
				InputTextareaModule,
				AutoCompleteModule,
				BrowserAnimationsModule,
				ButtonModule,
				InputSwitchModule,
				TooltipModule
			],
			declarations: [
				InputTextComponent,
				InputTextareaComponent,
				ButtonComponent,
				AutocompleteComponent
			]
		})
	)
	.add('Autocomplete', () => ({
		component: AutocompleteComponent,
		props: {
			control: new FormControl(),
			items: items,
			minLength: 1,
			dropdown: true
		}
	}))
	.add('AutocompleteWithButton', () => ({
		component: AutocompleteComponent,
		props: {
			control: new FormControl(),
			items: items,
			minLength: 1,
			dropdown: false,
			filterButton: true
		}
	}))
	.add(
		'Input Text',
		() => ({
			component: InputTextComponent,
			props: {
				control: new FormControl('', Validators.required),
				label: 'Name',
				type: 'text',
				placeholder: 'Enter your name',
				showStates: false
			}
		}),
		{
			notes:
				'tag=app-input-text\nlabel="Name"\ntype="text"\nicon="fas fa-search"\ncontrol="{{formControl}}"'
		}
	)

	.add(
		'Input Text Disabled',
		() => ({
			component: InputTextComponent,
			props: {
				control: new FormControl({ value: '', disabled: true }),
				label: 'Name',
				disabled: true,
				icon: 'fas fa-search',
				iconPosition: 'left',
				placeholder: 'Disabled',
				showStates: false
			}
		}),
		{
			notes:
				'tag=app-input-text\nlabel="Name"\ndisabled="true"\ntype="text"\nicon="fas fa-search"\ncontrol="{{formControl}}"'
		}
	)

	.add(
		'Input Text With Icon',
		() => ({
			component: InputTextComponent,
			props: {
				control: control1,
				label: 'Name',
				type: 'number',
				icon: 'fas fa-search',
				placeholder: 'input',
				showStates: true
			}
		}),
		{
			notes:
				'tag=app-input-text\nlabel="Name"\ntype="number"\nsuccess="true"\nicon="fas fa-search"\ncontrol="{{formControl}}"'
		}
	)

	.add(
		'Password',
		() => ({
			component: InputTextComponent,
			props: {
				control: control2,
				label: 'Password',
				type: 'password',
				placeholder: 'password',
				icon: 'fas fa-user',
				iconPosition: 'left',
				showStates: true
			}
		}),
		{
			notes:
				'tag=app-input-text\nlabel="Password"\ntype="password"\nerror="true"\nsuccess="true"' +
				'\nerrorMessage="Name can`t be empty"\ncontrol="{{formControl}}"'
		}
	)

	.add('InputTextArea', () => ({
		component: InputTextareaComponent,
		props: {
			rows: '20',
			cols: '30',
			label: 'Text area',
			placeholder: '',
			control: new FormControl()
		}
	}))
	.add('InputTextAreaDisabled', () => ({
		component: InputTextareaComponent,
		props: {
			rows: '10',
			cols: '30',
			label: 'Text area',
			placeholder: 'text area',
			control: new FormControl(),
			disabled: true
		}
	}))
	.add('Toggle', () => ({
		component: ToggleComponent,
		props: {
			control: new FormControl()
		}
	}))
	.add('ToggleDisabled', () => ({
		component: ToggleComponent,
		props: {
			disabled: true,
			control: new FormControl()
		}
	}));
