import { storiesOf, moduleMetadata } from '@storybook/angular';
import '@storybook/addon-notes/register';
import { configure, addDecorator } from '@storybook/angular';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';
// Forms
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';

import {RouterTestingModule} from '@angular/router/testing';
// Buttons
import {ButtonModule} from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SecondaryButtonComponent } from '../app/shared/components/buttons/secondary-button/secondary-button.component';
import { DefaultButtonComponent } from '../app/shared/components/buttons/default-button/default-button.component';
import { ActionButtonComponent } from '../app/shared/components/buttons/action-button/action-button.component';
import { ToolButtonComponent } from '../app/shared/components/buttons/tool-button/tool-button.component';

import { InputPasswordComponent } from '../app/shared/components/inputs/input-password/input-password.component';
import { InputTextComponent } from '../app/shared/components/inputs/input-text/input-text.component';

import {PasswordModule} from 'primeng/password';
import {InputTextModule} from 'primeng/inputtext';

import { RadioButtonComponent } from '../app/shared/components/input//radioButton/radio-button.component';
import { InputTextareaComponent } from '../app/shared/components/input/inputTextarea/input-textarea.component';

import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';

export const control1 = new FormControl('one');
export const control2 = new FormControl('');

addDecorator(withNotes);


storiesOf('Buttons', module)
	.addDecorator(
		moduleMetadata({
		imports: [	ButtonModule,
					SplitButtonModule,
					RouterTestingModule,
					BrowserAnimationsModule,
					BrowserModule
				],
		declarations: [	DefaultButtonComponent,
						SecondaryButtonComponent,
						ActionButtonComponent,
						ToolButtonComponent
					]
		})
	)
	.add('Secondary Button', () => ({
		component: SecondaryButtonComponent,
		props: {
			label: 'Secondary',
			size: 'big'
		}
	}), { notes: 'tag=app-secondary-button\nlabel="Secondary"\nsize="big"' })

	.add('Default Button', () => ({
		component: DefaultButtonComponent,
		props: {
			label: 'Default Button',
			icon: 'fas fa-check',
			iconPosition: 'right',
			size: 'large'
		}
	}), { notes: 'tag=app-default-button\nlabel="Default Button"\nsize="large"\nicon="fas fa-check"\niconPosition="right"' })

	.add('Disabled Button', () => ({
		component: DefaultButtonComponent,
		props: {
			label: 'Default Button',
			icon: 'fas fa-check',
			iconPosition: 'left',
			disabled: true,
			size: 'large'
		}
	}), { notes: 'tag=app-default-button\nlabel="Default Button"\nsize="large"\nicon="fas fa-check"\niconPosition="right"\ndisabled="true"' })

	.add('Action Button', () => ({
		component: ActionButtonComponent,
		props: {
			label: 'Action',
			items: [{label: 'One', icon: 'fas fa-check'}, {label: 'Two', icon: 'fa-refresh'}]
		}
	}), { notes: 'tag=app-action-button\nlabel="Action"\nitems="[{label: \'One\', icon: \'fas fa-check\'}, {label: \'Two\']"' })

	.add('Action Button Disabled', () => ({
		component: ActionButtonComponent,
		props: {
			label: 'Save',
			disabled: true,
			items: [{label: 'One', icon: 'fas fa-check'}, {label: 'Two', icon: 'fa-refresh'}]
		}
	}), { notes: 'tag=app-action-button\nlabel="Save"\ndisabled="true"\nitems="[{label: \'One\', icon: \'fas fa-check\'}, {label: \'Two\']"' })

	.add('Tool Button', () => ({
		component: ToolButtonComponent,
		props: {
			label: 'Filter',
			size: 'middle',
			icon: 'fas fa-filter',
			iconPosition: 'right',
		}
	}), { notes: 'tag=app-tool-button\nlabel="Filter"\nsize="middle"\nicon="fas fa-filter\niconPosition="right"' })

	.add('Small Button', () => ({
		component: ToolButtonComponent,
		props: {
			label: 'Small Button',
			size: 'small'
		}
	}), { notes: 'tag=app-tool-button\nlabel="Small Button"\nsize="small"' });

storiesOf('Input', module)
	.addDecorator(
		moduleMetadata({
			imports: [RadioButtonModule, InputTextareaModule],
			schemas: [],
			declarations: [RadioButtonComponent, InputTextareaComponent],
			providers: []
		})
	)
	.add('RadioButtonFromComponent', () => ({
		component: RadioButtonComponent,
		props: {
			name: 'group1',
			value: 'Option 1',
			label: 'Option 1',
			disabled: false
		}
	}))
	.add('RadioButtonDisabledFromComponent', () => ({
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
		<div class='ui-g-12'><p-radioButton name='group1' value='Option 1' label='Option 1' [(ngModel)]='val1' inputId='opt1'></p-radioButton></div>
		<div class='ui-g-12'><p-radioButton name='group1' value='Option 2' label='Option 2' [(ngModel)]='val1' inputId='opt2'></p-radioButton></div>
		<div class='ui-g-12'><p-radioButton name='group1' value='Option 3' label='Option 3' [(ngModel)]='val1' inputId='opt3'></p-radioButton></div>
	</div>`
	}))
	.add('InputTextAreaFromComponent', () => ({
		component: InputTextareaComponent,
		props: {
			rows: '5',
			cols: '30',
			disabled: 'false'
		}
	}))
	.add('InputTextAreaDisabledFromComponent', () => ({
		component: InputTextareaComponent,
		props: {
			rows: '5',
			cols: '30',
			disabled: 'true'
		}
	}));

	storiesOf('Input fields', module)
	.addDecorator(
		moduleMetadata({
			imports: [	RadioButtonModule,
						InputTextModule,
						FormsModule,
						ReactiveFormsModule
					],
			schemas: [],
			declarations: [InputTextComponent],
			providers: []
		})
	)
	.add('Input text', () => ({
		component: InputTextComponent,
		props: {
			control: control1
		}
	}));

