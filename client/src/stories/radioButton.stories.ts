import { storiesOf, moduleMetadata } from '@storybook/angular';
import '@storybook/addon-notes/register';
import { Component, OnInit, NgModule } from '@angular/core';
// Forms
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
// Buttons
import { ButtonModule } from 'primeng/button';
// Radiobutton
import { RadioButtonModule } from 'primeng/radiobutton';
import { RadioButtonComponent } from '../app/shared/components/form-field/checkbox/radioButton/radio-button.component';

@Component({
	selector: 'app-radio-button-group',
	template: `<h3 class="first">Basic</h3>
		<div class="ui-g" style="width:250px;margin-bottom:10px">
			<div class="ui-g-12">
				<app-radio-button name="group1" value="Option 1" label="Option 1" [control]="selectedValue">
			</app-radio-button></div>
			<div class="ui-g-12">
				<app-radio-button name="group1" value="Option 2" label="Option 2" [control]="selectedValue" disabled="true">
			</app-radio-button></div>
			<div class="ui-g-12">
				<app-radio-button name="group1" value="Option 3" label="Option 3" [control]="selectedValue">
			</app-radio-button></div>
		</div>
		<pre>{{selectedValue.value | json}}</pre>
		`
})
export class RadiobuttonGroupModelDrivenComponent implements OnInit {
	selectedValue: FormControl;

	ngOnInit() {
		this.selectedValue = new FormControl();
	}
}

/*@NgModule({
	imports: [
		FormsModule,
		ReactiveFormsModule,
		ButtonModule,
		RadioButtonModule
	],
	declarations: [RadioButtonComponent, RadiobuttonGroupModelDrivenComponent]
}) class RadioGroupModule {}*/

storiesOf('Radiobuttons', module)
	.addDecorator(
		moduleMetadata({
			imports: [
				FormsModule,
				ReactiveFormsModule,
				ButtonModule,
				RadioButtonModule
			],
			declarations: [
				RadioButtonComponent,
				RadiobuttonGroupModelDrivenComponent
			]
		})
	)

	.add('RadioButton', () => ({
		component: RadioButtonComponent,
		props: {
			name: 'group1',
			label: 'Option 1',
			disabled: false,
			control: new FormControl()
		}
	}))
	.add('RadioButtonDisabled', () => ({
		component: RadioButtonComponent,
		props: {
			name: 'group1',
			label: 'Option 1',
			disabled: true,
			control: new FormControl()
		}
	}))
	.add('RadiobuttonGroupModelDriven', () => ({
		component: RadiobuttonGroupModelDrivenComponent,
		props: {}
	}));
