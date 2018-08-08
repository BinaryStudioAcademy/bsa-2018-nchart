import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action, centered } from '@storybook/addon-actions';

import { SecondaryButtonComponent } from '../app/shared/components/buttons/secondary-button.component';
import { DefaultButtonComponent } from '../app/shared/components/buttons/default-button.component';

import { InputPasswordComponent } from '../app/shared/components/inputs/input-password/input-password.component';
import { InputTextComponent } from '../app/shared/components/inputs/input-text/input-text.component';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonComponent } from '../app/shared/components/input//radioButton/radio-button.component';
import { InputTextareaComponent } from '../app/shared/components/input/inputTextarea/input-textarea.component';

import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToggleComponent } from '../app/shared/components/input/toggle/toggle.component';

export const control1 = new FormControl('one');
export const control2 = new FormControl('');

storiesOf('Buttons', module)
	.addDecorator(
		moduleMetadata({
			imports: [ButtonModule],
			schemas: [],
			declarations: [DefaultButtonComponent, SecondaryButtonComponent],
			providers: []
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
			label: 'World'
		}
	}));

storiesOf('Input', module)
	.addDecorator(
		moduleMetadata({
			imports: [
				RadioButtonModule,
				InputTextareaModule,
				ReactiveFormsModule
			],
			schemas: [],
			declarations: [
				RadioButtonComponent,
				InputTextareaComponent,
				ToggleComponent
			],
			providers: []
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
	.add('InputTextArea', () => ({
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

// storiesOf('Inputs', module)
// 	.addDecorator(
// 		moduleMetadata ({
// 		imports: [],
// 		declarations: [],
// 		providers: [],
// 		})
// 	)
// 	.add('Password', () => ({
// 		component: InputPasswordComponent,
// 		props: {
// 			control: control2
// 		},
// 	}))
// 	.add('Text', () => ({
// 		component: InputTextComponent,
// 		props: {
// 			label: 'Text field',
// 		},
// 	}));
