import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';

import {RouterTestingModule} from '@angular/router/testing';
import { SecondaryButtonComponent } from '../app/shared/components/buttons/secondary-button/secondary-button.component';
import { DefaultButtonComponent } from '../app/shared/components/buttons/default-button/default-button.component';
import { ActionButtonComponent } from '../app/shared/components/buttons/action-button/action-button.component';

import { InputPasswordComponent } from '../app/shared/components/inputs/input-password/input-password.component';
import { InputTextComponent } from '../app/shared/components/inputs/input-text/input-text.component';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import {InputTextModule} from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';

import { FormControl, Validators } from '@angular/forms';

import { RadioButtonComponent } from '../app/shared/components/input//radioButton/radio-button.component';
import { InputTextareaComponent } from '../app/shared/components/input/inputTextarea/input-textarea.component';

import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';

export const control1 = new FormControl('one');
export const control2 = new FormControl('');



storiesOf('Buttons', module)
	.addDecorator(
		moduleMetadata({
		imports: [ButtonModule, SplitButtonModule, RouterTestingModule, BrowserAnimationsModule, BrowserModule],
		schemas: [],
		declarations: [DefaultButtonComponent, SecondaryButtonComponent, ActionButtonComponent],
		providers: [],
		})
	)
	.add('Secondary', () => ({
		component: SecondaryButtonComponent,
		props: {
			label: 'Hello'
		}
	}))
	.add('Default', () => ({
		component: DefaultButtonComponent,
		props: {
			label: 'Default Button',
			icon: 'fas fa-check',
			iconPosition: 'right',
		}
	}))
	.add('Disabled Button', () => ({
		component: DefaultButtonComponent,
		props: {
			label: 'Default Button',
			icon: 'fas fa-check',
			iconPosition: 'left',
			disabled: true,
		}
	}))
	.add('Action Button Disabled', () => ({
		component: ActionButtonComponent,
		props: {
			label: 'Save',
			disabled: true
		}
	}))
	.add('Action Button', () => ({
		component: ActionButtonComponent,
		props: {
			label: 'Save',
			items: [{label: 'One', icon: 'fas fa-check'}, {label: 'Two', icon: 'fa-refresh'}]
		}
	}));

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
		template: `<div class='ui-g' style='width:250px;margin-bottom:10px'>
		<div class='ui-g-12'><app-radio-button name='group1' value='Option 1' label='Option 1' [disabled]='false' [(ngModel)]='val1' ></app-radio-button></div>
	</div>`
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

	storiesOf('Input', module)
	.addDecorator(
		moduleMetadata({
			imports: [RadioButtonModule, InputTextModule, FormsModule, ReactiveFormsModule],
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

