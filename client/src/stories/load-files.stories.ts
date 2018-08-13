import { storiesOf, moduleMetadata } from '@storybook/angular';
import '@storybook/addon-notes/register';

import { ReactiveFormsModule } from '@angular/forms';
import { LoadFilesComponent } from '../app/core/load-files/load-files.component';
import { TabViewModule } from 'primeng/tabview';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextComponent } from '../app/shared/components/form-field/input-text/input-text.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextareaComponent } from '../app/shared/components/form-field/input-textarea/input-textarea.component';
import { ButtonComponent } from '../app/shared/components/button/button/button.component';
import { ButtonModule } from 'primeng/button';



storiesOf('Load files', module)
	.addDecorator(
		moduleMetadata({
			imports: [ InputTextModule,
				TabViewModule, FileUploadModule, InputTextareaModule,
				ReactiveFormsModule, ButtonModule
			],
			declarations: [LoadFilesComponent, InputTextareaComponent, InputTextComponent,
				ButtonComponent]
		})
	)

	.add('Load', () => ({
		template: `<app-load-files></app-load-files>`,
		props: {}
	}));
