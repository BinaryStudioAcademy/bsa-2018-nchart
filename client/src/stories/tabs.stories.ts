import { storiesOf, moduleMetadata } from '@storybook/angular';
import '@storybook/addon-notes/register';
import { TabViewModule } from 'primeng/tabview';

import { ButtonModule } from 'primeng/button';
import { ButtonComponent } from '../app/shared/components/button/button/button.component';

storiesOf('Tabs', module)
	.addDecorator(
		moduleMetadata({
			imports: [TabViewModule, ButtonModule],
			declarations: [ButtonComponent]
		})
	)

	.add('Simple tabs', () => ({
		template: `<p-tabView 	[activeIndex]="0"
								(onChange)="{}">
						<p-tabPanel header="One">
							<h2>Content 1</h2>
							<app-button label="lalal"></app-button>
						</p-tabPanel>
						<p-tabPanel header="Two">
							<h2>Content 2</h2>
							<app-button label="lol"></app-button>
						</p-tabPanel>
						<p-tabPanel header="Fife" [disabled]="true">
						</p-tabPanel>
					</p-tabView>`,
		props: {}
	}))
	.add('Tabs with icons', () => ({
		template: `<p-tabView 	[activeIndex]="0"
								(onChange)="{}">
						<p-tabPanel
								header="One"
								leftIcon="fa fa-user"
						>
							Content 1
						</p-tabPanel>
						<p-tabPanel
								header="One"
								leftIcon="fa fa-user"
								rightIcon="fa fa-search"
						>
							Content 2
						</p-tabPanel>
						<p-tabPanel
								header="One"
								leftIcon="fa fa-check"
						>
							Content 33
						</p-tabPanel>
					</p-tabView>`,
		props: {}
	}))
	.add('Closable Tabs', () => ({
		template: `<p-tabView 	[activeIndex]="0"
								(onChange)="{}">
						<p-tabPanel
								header="One"
								[closable]="true"
						>
							<h2>Content 2</h2>
						</p-tabPanel>
						<p-tabPanel
								header="Three"
								[closable]="true"
								[disabled]="true"
						>
							<h2>Content 1</h2>
						</p-tabPanel>
					</p-tabView>`,
		props: {}
	}));
