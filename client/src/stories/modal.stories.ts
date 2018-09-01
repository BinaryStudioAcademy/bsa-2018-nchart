import { storiesOf, moduleMetadata } from '@storybook/angular';
import '@storybook/addon-notes/register';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ButtonComponent } from '../app/shared/components/button/button/button.component';

storiesOf('Modal windows', module)
	.addDecorator(
		moduleMetadata({
			imports: [DialogModule, ButtonModule],
			declarations: [ButtonComponent]
		})
	)

	.add('Simple tabs', () => ({
		template: `<p-dialog header="Title" [(visible)]="display">
					Content
					</p-dialog>
					<app-button (onclick)="display=false" icon="pi pi-info-circle" label="Show"></app-button>`,
		props: {}
	}))
	.add('Tabs with icons', () => ({
		template: ``,
		props: {}
	}))
	.add('Closable Tabs', () => ({
		template: ``,
		props: {}
	}));
