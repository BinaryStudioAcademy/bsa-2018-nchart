import { storiesOf, moduleMetadata } from '@storybook/angular';
import '@storybook/addon-notes/register';
import { TooltipModule } from 'primeng/tooltip';

// Forms
import { FormsModule, MinLengthValidator } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ButtonComponent } from '../app/shared/components/button/button/button.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextComponent } from '../app/shared/components/form-field/input-text/input-text.component';

export const control = new FormControl();
export function showList(): string {
	return '<h2>Hi</h2>';
}

storiesOf('Tooltips', module)
	.addDecorator(
		moduleMetadata({
			imports: [
				TooltipModule,
				InputTextModule,
				ReactiveFormsModule,
				ButtonModule,
				FormsModule
			],
			declarations: [InputTextComponent, ButtonComponent]
		})
	)

	.add('Tooltip top', () => ({
		template: `	<div style="margin: 140px auto; width: 60px; height:100px" class="ui-main-block"
						[pTooltip]="showContent()" [escape]="false" tooltipPosition="top">
						Block with tooltip
					</div>`,
		props: {
			control: new FormControl(),
			showContent: function() {
				return '<h4>Tooltip</h4>Some useful information can be here';
			}
		}
	}))

	.add('Tooltip right', () => ({
		template: `	<div style="margin: 40px auto; width: 60px; height:100px" class="ui-main-block"
						[pTooltip]="showContent()" [escape]="false">
						Block with tooltip
					</div>`,
		props: {
			control: new FormControl(),
			showContent: function() {
				return '<h4>Tooltip</h4>Some useful info';
			}
		}
	}))

	.add('Tooltip bottom', () => ({
		template: `<div style="margin: 40px auto; height:100px" class="ui-main-block"
					tooltipPosition="bottom" [pTooltip]="showContent()" [escape]="false">
					Block with tooltip
					</div>`,
		props: {
			control: new FormControl(),
			showContent: function() {
				return '<h4>da</h4><i class="fas fa-info"></i>This is information tooltip';
			}
		}
	}))

	.add('Tooltip left', () => ({
		template: `	<div style="margin: 40px auto; width: 260px; height:100px" class="ui-main-block">
						<app-input-text [control]="control" label="Input with tooltip"
							[tooltip]="showContent()" [tooltipEscape]="false" tooltipPosition="left">
						</app-input-text>
					</div>`,
		props: {
			control: new FormControl(),
			showContent: function() {
				return '<h4><i class="fas fa-edit"></i>Tooltip</h4>Some text text text text';
			}
		}
	}));
