import { storiesOf, moduleMetadata, addDecorator } from '@storybook/angular';
import '@storybook/addon-notes/register';
import { withNotes } from '@storybook/addon-notes';
// Forms
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
// Buttons
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SecondaryButtonComponent } from '../app/shared/components/buttons/secondary-button/secondary-button.component';
import { DefaultButtonComponent } from '../app/shared/components/buttons/default-button/default-button.component';
import { ActionButtonComponent } from '../app/shared/components/buttons/action-button/action-button.component';
import { ToolButtonComponent } from '../app/shared/components/buttons/tool-button/tool-button.component';
// Inputs
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextComponent } from '../app/shared/components/inputs/input-text/input-text.component';
import { InputTextareaComponent } from '../app/shared/components/input/inputTextarea/input-textarea.component';
// Radiobutton
import { RadioButtonComponent } from '../app/shared/components/input//radioButton/radio-button.component';
import { RadioButtonModule } from 'primeng/radiobutton';
// Checkbox
import { CheckboxModule } from 'primeng/checkbox';
import { CheckboxComponent } from '../app/shared/components/checkbox/checkbox/checkbox.component';
import { CheckboxGroupComponent } from '../app/shared/components/checkbox/checkbox-group/checkbox-group.component';
// Dropdowns
import { DropdownModule } from 'primeng/dropdown';
import { DropdownSimpleComponent } from '../app/shared/components/dropdowns/dropdown-simple/dropdown-simple.component';
import { DropdownGroupComponent } from '../app/shared/components/dropdowns/dropdown-group/dropdown-group.component';
import { ToggleComponent } from '../app/shared/components/input/toggle/toggle.component';

export const control1 = new FormControl('', Validators.required);
export const control3 = new FormControl('', Validators.required);
export const control2 = new FormControl('', [
	Validators.required,
	Validators.minLength(3)
]);

addDecorator(withNotes);

storiesOf('Buttons', module)
	.addDecorator(
		moduleMetadata({
			imports: [
				ButtonModule,
				SplitButtonModule,
				RouterTestingModule,
				BrowserAnimationsModule,
				BrowserModule
			],
			declarations: [
				DefaultButtonComponent,
				SecondaryButtonComponent,
				ActionButtonComponent,
				ToolButtonComponent
			]
		})
	)
	.add(
		'Secondary Button',
		() => ({
			component: SecondaryButtonComponent,
			props: {
				label: 'Secondary',
				size: 'big'
			}
		}),
		{ notes: 'tag=app-secondary-button\nlabel="Secondary"\nsize="big"' }
	)

	.add(
		'Default Button',
		() => ({
			component: DefaultButtonComponent,
			props: {
				label: 'Default Button',
				icon: 'fas fa-check',
				iconPosition: 'right',
				size: 'large'
			}
		}),
		{
			notes:
				'tag=app-default-button\nlabel="Default Button"\nsize="large"\nicon="fas fa-check"\niconPosition="right"'
		}
	)

	.add(
		'Disabled Button',
		() => ({
			component: DefaultButtonComponent,
			props: {
				label: 'Default Button',
				icon: 'fas fa-check',
				iconPosition: 'left',
				disabled: true,
				size: 'large'
			}
		}),
		{
			notes:
				'tag=app-default-button\nlabel="Default Button"\nsize="large"\nicon="fas fa-check"\niconPosition="right"\ndisabled="true"'
		}
	)

	.add(
		'Action Button',
		() => ({
			component: ActionButtonComponent,
			props: {
				label: 'Action',
				items: [
					{ label: 'One', icon: 'fas fa-check' },
					{ label: 'Two', icon: 'fa-refresh' }
				]
			}
		}),
		{
			notes:
				"tag=app-action-button\nlabel=\"Action\"\nitems=\"[{label: 'One', icon: 'fas fa-check'}, {label: 'Two']\""
		}
	)

	.add(
		'Action Button Disabled',
		() => ({
			component: ActionButtonComponent,
			props: {
				label: 'Save',
				disabled: true,
				items: [
					{ label: 'One', icon: 'fas fa-check' },
					{ label: 'Two', icon: 'fa-refresh' }
				]
			}
		}),
		{
			notes:
				'tag=app-action-button\nlabel="Save"\ndisabled="true"\nitems="[{label: \'One\', icon: \'fas fa-check\'}, {label: \'Two\']"'
		}
	)

	.add(
		'Tool Button',
		() => ({
			component: ToolButtonComponent,
			props: {
				label: 'Filter',
				size: 'middle',
				icon: 'fas fa-filter',
				iconPosition: 'right'
			}
		}),
		{
			notes:
				'tag=app-tool-button\nlabel="Filter"\nsize="middle"\nicon="fas fa-filter\niconPosition="right"'
		}
	)

	.add(
		'Small Button',
		() => ({
			component: ToolButtonComponent,
			props: {
				label: 'Small Button',
				size: 'small'
			}
		}),
		{ notes: 'tag=app-tool-button\nlabel="Small Button"\nsize="small"' }
	);

storiesOf('Radiobuttons', module)
	.addDecorator(
		moduleMetadata({
			imports: [RadioButtonModule],
			declarations: [RadioButtonComponent]
		})
	)
	.add('RadioButton', () => ({
		component: RadioButtonComponent,
		props: {
			name: 'group1',
			value: 'Option 1',
			label: 'Option 1',
			disabled: false
		}
	}))
	.add('RadioButtonDisabled', () => ({
		component: RadioButtonComponent,
		props: {
			name: 'group1',
			value: 'Option 1',
			label: 'Option 1',
			disabled: 'true'
		}
	}))
	.add('RadioButton', () => ({
		template: `<div class='ui-g' style='width:250px;margin-bottom:10px'>
		<div class='ui-g-12'><p-radioButton name='group1' value='Option 1' label='Option 1' [(ngModel)]='val1' inputId='opt1'>
		</p-radioButton></div>
		<div class='ui-g-12'><p-radioButton name='group1' value='Option 2' label='Option 2' [(ngModel)]='val1' inputId='opt2'>
		</p-radioButton></div>
		<div class='ui-g-12'><p-radioButton name='group1' value='Option 3' label='Option 3' [(ngModel)]='val1' inputId='opt3'>
		</p-radioButton></div></div>`
	}));

storiesOf('Input fields', module)
	.addDecorator(
		moduleMetadata({
			imports: [
				InputTextModule,
				FormsModule,
				ReactiveFormsModule,
				InputTextareaModule
			],
			declarations: [InputTextComponent, InputTextareaComponent]
		})
	)
	.add(
		'Input Text',
		() => ({
			component: InputTextComponent,
			props: {
				control: control1,
				label: 'Name',
				type: 'text',
				icon: 'fas fa-search'
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
				control: control3,
				label: 'Name',
				disabled: true,
				icon: 'fas fa-search'
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

	.add('InputTextAreaFromComponent', () => ({
		component: InputTextareaComponent,
		props: {
			rows: '5',
			cols: '30',
			disabled: 'false'
		}
	}))
	.add('InputTextAreaDisabled', () => ({
		component: InputTextareaComponent,
		props: {
			rows: '5',
			cols: '30',
			disabled: 'true'
		}
	}))
	.add('Toggle', () => ({
		component: ToggleComponent,
		props: {}
	}))
	.add('ToggleDisabled', () => ({
		component: ToggleComponent,
		props: {
			disabled: true
		}
	}));

storiesOf('Checkbox', module)
	.addDecorator(
		moduleMetadata({
			imports: [CheckboxModule, FormsModule, ReactiveFormsModule],
			declarations: [CheckboxComponent, CheckboxGroupComponent]
		})
	)
	.add(
		'Checkbox default',
		() => ({
			component: CheckboxComponent,
			props: {
				label: 'I definetly want to choose it',
				value: 'first',
				control: new FormControl('', Validators.required)
			}
		}),
		{
			notes:
				'tag=app-checkbox\nlabel="I definetly want to choose it"\nvalue="first"\ncontrol="{{formControl}}"'
		}
	)

	.add(
		'Checkbox checked',
		() => ({
			component: CheckboxComponent,
			props: {
				label: 'I choose it!',
				value: 'second',
				selectedValues: ['second'],
				control: new FormControl('', Validators.required)
			}
		}),
		{
			notes:
				'tag=app-checkbox\nlabel="I choose it!"\nvalue="second"\nselectedValues="[\'second\']"\ncontrol="{{formControl}}"'
		}
	)

	.add(
		'Checkbox disabled',
		() => ({
			component: CheckboxComponent,
			props: {
				label: 'I`m disabled (',
				value: 'third',
				disabled: true,
				control: new FormControl(true)
			}
		}),
		{
			notes:
				'tag=app-checkbox\nlabel="I`m disabled ("\nvalue="third"\ndisabled="true"\ncontrol="{{formControl}}"'
		}
	)

	.add(
		'Checkbox checked disabled',
		() => ({
			component: CheckboxComponent,
			props: {
				label: 'I`m disabled too (',
				value: 'fifth',
				disabled: true,
				selectedValues: ['fifth'],
				control: new FormControl(true)
			}
		}),
		{
			notes:
				'tag=app-checkbox\nlabel="I`m disabled too ("\nvalue="third"\ndisabled="true"\nselectedValues="[\'second\']"'
		}
	)

	.add(
		'Checkbox group',
		() => ({
			component: CheckboxGroupComponent,
			props: {
				checks: [
					{
						label: 'First item',
						value: 'first',
						disabled: false
					},
					{
						label: 'Seventh item',
						value: 'second',
						disabled: false
					},
					{
						label: 'Fifth item',
						value: 'third',
						disabled: true
					}
				],
				selectedValues: ['second', 'third']
			}
		}),
		{
			notes:
				'tag=app-checkbox-group\nchecks="[{label:..., value:..., disabled:...}]"'
		}
	);

storiesOf('Dropdowns', module)
	.addDecorator(
		moduleMetadata({
			imports: [
				DropdownModule,
				FormsModule,
				ReactiveFormsModule,
				BrowserAnimationsModule
			],
			declarations: [DropdownSimpleComponent, DropdownGroupComponent]
		})
	)
	.add(
		'Simple Dropdown',
		() => ({
			component: DropdownSimpleComponent,
			props: {
				placeholder: 'Select item',
				options: [{ name: 'Select me!' }],
				control: new FormControl('', Validators.required),
				optionLabel: 'name'
			}
		}),
		{
			notes:
				'tag=dropdown-simple\nplaceholder="Select item"\noptions="[{name: \'Select me!\'}]"\noptionLabel="name"'
		}
	)

	.add(
		'Dropdown Disabled',
		() => ({
			component: DropdownSimpleComponent,
			props: {
				placeholder: 'Select item',
				control: new FormControl('', Validators.required),
				optionLabel: 'name',
				disabled: true
			}
		}),
		{
			notes:
				'tag=dropdown-simple\nplaceholder="Select item"\ndisabled="true"\noptionLabel="name"'
		}
	)

	.add(
		'Group Dropdown',
		() => ({
			component: DropdownSimpleComponent,
			props: {
				placeholder: 'Select item',
				options: [
					{ label: 'Group name', items: [{ label: 'Select me!' }] }
				],
				control: new FormControl('', Validators.required),
				group: true
			}
		}),
		{
			notes:
				"tag=dropdown-simple\noptions=\"[{label: 'Group name', items: [{label: 'Select me!'}]}]\""
		}
	);
