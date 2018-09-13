import { storiesOf, moduleMetadata, addDecorator } from '@storybook/angular';
import '@storybook/addon-notes/register';
import { withNotes } from '@storybook/addon-notes';
// Forms
import { FormControl, Validators } from '@angular/forms';
// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
// Buttons
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ButtonComponent } from '@app/shared/components/button/button/button.component';
import { ActionButtonComponent } from '@app/shared/components/button/action-button/action-button.component';
import { LoadingSpinnerComponent } from '@app/shared/components/loading-spinner/loading-spinner.component';
import { PopupMenuComponent } from '@app/shared/components/button/popup-menu/popup-menu.component';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TooltipModule } from 'primeng/tooltip';

export const control1 = new FormControl('', Validators.required);
export const control2 = new FormControl('', [
	Validators.required,
	Validators.minLength(3)
]);

addDecorator(withNotes);

storiesOf('Buttons', module)
	.addDecorator(
		moduleMetadata({
			imports: [
				ButtonModule,
				SplitButtonModule,
				RouterTestingModule,
				BrowserAnimationsModule,
				BrowserModule,
				TieredMenuModule,
				TooltipModule
			],
			declarations: [
				ButtonComponent,
				ActionButtonComponent,
				LoadingSpinnerComponent,
				PopupMenuComponent
			]
		})
	)
	.add(
		'Secondary Button',
		() => ({
			component: ButtonComponent,
			props: {
				label: 'Secondary',
				size: 'big',
				type: 'default'
			}
		}),
		{ notes: 'tag=app-secondary-button\nlabel="Secondary"\nsize="big"' }
	)

	.add(
		'Default Button',
		() => ({
			component: ButtonComponent,
			props: {
				label: 'Default Button',
				icon: 'fas fa-check',
				iconPosition: 'right',
				size: 'large',
				type: 'secondary'
			}
		}),
		{
			notes:
				'tag=app-default-button\nlabel="Default Button"\nsize="large"\nicon="fas fa-check"\niconPosition="right"'
		}
	)

	.add(
		'Disabled Button',
		() => ({
			component: ButtonComponent,
			props: {
				label: 'Default Button',
				icon: 'fas fa-check',
				iconPosition: 'left',
				disabled: true,
				size: 'large',
				type: 'secondary'
			}
		}),
		{
			notes:
				'tag=app-default-button\nlabel="Default Button"\nsize="large"\nicon="fas fa-check"\niconPosition="right"\ndisabled="true"'
		}
	)

	.add(
		'Action Button',
		() => ({
			component: ActionButtonComponent,
			props: {
				label: 'Action',
				items: [
					{ label: 'One', icon: 'fas fa-check' },
					{ label: 'Two', icon: 'fa-refresh' }
				]
			}
		}),
		{
			notes: `tag=app-action-button\nlabel=\"Action\"\ni
					tems=\"[{label: 'One', icon: 'fas fa-check'}, {label: 'Two']\"`
		}
	)

	.add(
		'Action Button Disabled',
		() => ({
			component: ActionButtonComponent,
			props: {
				label: 'Save',
				disabled: true,
				items: [
					{ label: 'One', icon: 'fas fa-check' },
					{ label: 'Two', icon: 'fa-refresh' }
				]
			}
		}),
		{
			notes:
				'tag=app-action-button\nlabel="Save"\ndisabled="true"\nitems="[{label: \'One\', icon: \'fas fa-check\'}, {label: \'Two\']"'
		}
	)

	.add(
		'Tool Button',
		() => ({
			component: ButtonComponent,
			props: {
				label: 'Filter',
				size: 'middle',
				icon: 'fas fa-filter',
				iconPosition: 'right',
				type: 'tool'
			}
		}),
		{
			notes:
				'tag=app-tool-button\nlabel="Filter"\nsize="middle"\nicon="fas fa-filter\niconPosition="right"'
		}
	)

	.add(
		'Small Button',
		() => ({
			component: ButtonComponent,
			props: {
				label: 'Small Button',
				size: 'small',
				type: 'secondary'
			}
		}),
		{ notes: 'tag=app-tool-button\nlabel="Small Button"\nsize="small"' }
	)

	.add('Icon Button', () => ({
		component: ButtonComponent,
		props: {
			type: 'icon',
			icon: 'fas fa-cannabis'
		}
	}))

	.add('Popup Button', () => ({
		component: PopupMenuComponent,
		props: {
			items: [
				{
					label: 'New column',
					icon: 'pi pi-fw pi-plus'
				},
				{
					label: 'Convert type',
					items: [
						{
							label: 'To number'
						},
						{
							label: 'To string'
						},
						{
							label: 'To boolean'
						}
					]
				},
				{
					label: 'Delete column',
					icon: 'pi pi-fw pi-trash'
				}
			]
		}
	}));
