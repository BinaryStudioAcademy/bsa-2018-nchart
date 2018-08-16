import { storiesOf, moduleMetadata } from '@storybook/angular';
import '@storybook/addon-notes/register';
// Forms
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
// Checkbox
import { CheckboxModule } from 'primeng/checkbox';
import { CheckboxComponent } from '../app/shared/components/form-field/checkbox/checkbox/checkbox.component';
import { CheckboxGroupComponent } from '../app/shared/components/form-field/checkbox/checkbox-group/checkbox-group.component';

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
				control: new FormControl(
					{ value: '', disabled: false },
					Validators.required
				)
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
				control: new FormControl(
					{ value: '', disabled: false },
					Validators.required
				)
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
				control: new FormControl(
					{ value: '', disabled: true },
					Validators.required
				)
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
				selectedValues: ['fifth'],
				control: new FormControl(
					{ value: '', disabled: true },
					Validators.required
				)
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
						control: new FormControl(
							{ value: '', disabled: false },
							Validators.required
						)
					},
					{
						label: 'Seventh item',
						value: 'second',
						control: new FormControl(
							{ value: '', disabled: false },
							Validators.required
						)
					},
					{
						label: 'Fifth item',
						value: 'third',
						control: new FormControl(
							{ value: '', disabled: false },
							Validators.required
						)
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
