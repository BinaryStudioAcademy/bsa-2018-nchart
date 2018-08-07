import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action, centered } from '@storybook/addon-actions';

import { SecondaryButtonComponent } from '../app/shared/components/buttons/secondary-button.component';
import { DefaultButtonComponent } from '../app/shared/components/buttons/default-button.component';
import { InputPasswordComponent } from '../app/shared/components/inputs/input-password/input-password.component';
import { InputTextComponent } from '../app/shared/components/inputs/input-text/input-text.component';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import {InputTextModule} from 'primeng/inputtext';
import { FormControl, Validators } from '@angular/forms';

export const control1 = new FormControl('one');
export const control2 = new FormControl('');



storiesOf('Buttons', module)
	.addDecorator(
		moduleMetadata({
		imports: [ButtonModule],
		schemas: [],
		declarations: [DefaultButtonComponent, SecondaryButtonComponent],
		providers: [],
		})
	)
	.add('Secondary', () => ({
		component: SecondaryButtonComponent,
		props: {
			label: 'Hello',
			click: action('clicked'),
		},
	}))
	.add('Default', () => ({
		component: DefaultButtonComponent,
		props: {
			label: 'World'
		},
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
