import { storiesOf, moduleMetadata } from '@storybook/angular';
// import { action } from '@storybook/addon-actions';
import { SecondaryButtonComponent } from '../app/shared/components/buttons/secondary-button.component';
import { DefaultButtonComponent } from '../app/shared/components/buttons/default-button.component';
import {ButtonModule} from 'primeng/button';

storiesOf('My Button', module)
	.addDecorator(
		moduleMetadata({
		imports: [ButtonModule],
		schemas: [],
		declarations: [DefaultButtonComponent],
		providers: [],
		})
	)
	.add('with some emoji', () => ({
		component: SecondaryButtonComponent,
		props: {
			label: 'Hello',
		},
	}))
	.add('default', () => ({
		component: DefaultButtonComponent,
		props: {
			label: 'World',
		},
	}));
