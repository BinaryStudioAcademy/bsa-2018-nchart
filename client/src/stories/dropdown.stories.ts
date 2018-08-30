import { storiesOf, moduleMetadata } from '@storybook/angular';
import '@storybook/addon-notes/register';
// Forms
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Dropdowns
import { DropdownModule } from 'primeng/dropdown';
import { DropdownSimpleComponent } from '@app/shared/components/form-field/dropdown/dropdown-simple/dropdown-simple.component';

storiesOf('Dropdowns', module)
	.addDecorator(
		moduleMetadata({
			imports: [
				DropdownModule,
				FormsModule,
				ReactiveFormsModule,
				BrowserAnimationsModule
			],
			declarations: [DropdownSimpleComponent]
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
