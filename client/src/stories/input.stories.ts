import { storiesOf, moduleMetadata, addDecorator } from '@storybook/angular';
import '@storybook/addon-notes/register';
import { withNotes } from '@storybook/addon-notes';
// Forms
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Buttons
import { ButtonModule } from 'primeng/button';
import { ToolButtonComponent } from '../app/shared/components/buttons/tool-button/tool-button.component';
// Inputs
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextComponent } from '../app/shared/components/input/input-text/input-text.component';
import { InputTextareaComponent } from '../app/shared/components/input/inputTextarea/input-textarea.component';
// Toggle
import { ToggleComponent } from '../app/shared/components/input/toggle/toggle.component';
import { InputSwitchModule } from 'primeng/inputswitch';
// Autocomplete
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AutocompleteComponent } from '../app/shared/components/input/autocomplete/autocomplete.component';

export const control1 = new FormControl('', Validators.required);
export const control2 = new FormControl('', [
	Validators.required,
	Validators.minLength(3)
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
				InputSwitchModule
			],
			declarations: [
				InputTextComponent,
				InputTextareaComponent,
				AutocompleteComponent,
				ToolButtonComponent
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
				control: new FormControl({ value: '', disabled: false }),
				label: 'Name',
				type: 'text',
				icon: 'fas fa-search',
				placeholder: 'Enter your name'
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
				placeholder: 'Disabled'
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
				control: new FormControl('', Validators.required),
				label: 'Name',
				type: 'number',
				icon: 'fas fa-search',
				success: true
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
				errorMessage: 'Name can`t be empty',
				success: true,
				error: true
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
			control: new FormControl({ value: '', disabled: false })
		}
	}))
	.add('InputTextAreaDisabled', () => ({
		component: InputTextareaComponent,
		props: {
			rows: '10',
			cols: '30',
			control: new FormControl({ value: '', disabled: true })
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
