import { storiesOf, moduleMetadata } from '@storybook/angular';
// import { action } from '@storybook/addon-actions';
import { SecondaryButtonComponent } from '../app/shared/components/buttons/secondary-button.component';
import { DefaultButtonComponent } from '../app/shared/components/buttons/default-button.component';
import { RadioButtonComponent } from '../app/shared/components/input//radioButton/radio-button.component';
import { InputTextareaComponent } from '../app/shared/components/input/inputTextarea/input-textarea.component';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';

storiesOf('My Button', module)
	.addDecorator(
		moduleMetadata({
			imports: [ButtonModule],
			schemas: [],
			declarations: [DefaultButtonComponent],
			providers: []
		})
	)
	.add('with some emoji', () => ({
		component: SecondaryButtonComponent,
		props: {
			label: 'Hello'
		}
	}))
	.add('default', () => ({
		component: DefaultButtonComponent,
		props: {
			label: 'World'
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
