import { storiesOf, moduleMetadata } from '@storybook/angular';
import '@storybook/addon-notes/register';
import { Component } from '@angular/core';
// Forms
import { FormsModule, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
// Buttons
import { ButtonModule } from 'primeng/button';
// Radiobutton
import { RadioButtonComponent } from '../app/shared/components/input//radioButton/radio-button.component';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
	selector: 'radio-button-group',
	template: `<h3 class="first">Basic</h3>
		<div class="ui-g" style="width:250px;margin-bottom:10px">
			<div class="ui-g-12"><app-radio-button name="group1" value="Option 1" label="Option 1" [control]="selectedValue"></app-radio-button></div>
			<div class="ui-g-12"><app-radio-button name="group1" value="Option 2" label="Option 2" [control]="selectedValue" disabled="true"></app-radio-button></div>
			<div class="ui-g-12"><app-radio-button name="group1" value="Option 3" label="Option 3" [control]="selectedValue"></app-radio-button></div>
		</div>
		<pre>{{selectedValue.value | json}}</pre>
		`
})
export class RadiobuttonGroupModelDriven {
	selectedValue: FormControl;

	ngOnInit() {
		this.selectedValue = new FormControl();
	}
}

storiesOf('Radiobuttons', module)
	.addDecorator(
		moduleMetadata({
			imports: [
				FormsModule,
				ReactiveFormsModule,
				ButtonModule,
				RadioButtonModule
			],
			declarations: [RadioButtonComponent]
		})
	)

	.add('RadioButton', () => ({
		component: RadioButtonComponent,
		props: {
			name: 'group1',
			value: 'Option 1',
			label: 'Option 1',
			disabled: false,
			control: new FormControl()
		}
	}))
	.add('RadioButtonDisabled', () => ({
		component: RadioButtonComponent,
		props: {
			name: 'group1',
			value: 'Option 1',
			label: 'Option 1',
			disabled: true,
			control: new FormControl()
		}
	}))
	.add('RadiobuttonGroupModelDriven', () => ({
		component: RadiobuttonGroupModelDriven,
		props: {}
	}));
