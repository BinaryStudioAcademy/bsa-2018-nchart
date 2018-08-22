import { storiesOf, moduleMetadata } from '@storybook/angular';
import '@storybook/addon-notes/register';
import { DragulaModule } from 'ng2-dragula';
import { DragDropComponent } from '../app/shared/components/dragDrop/drag-drop.component';
import { ButtonModule } from 'primeng/button';
import { ButtonComponent } from '../app/shared/components/button/button/button.component';
storiesOf('Drag and Drop', module)
	.addDecorator(
		moduleMetadata({
			imports: [DragulaModule.forRoot(), ButtonModule],
			declarations: [DragDropComponent, ButtonComponent]
		})
	)
	.add('Simple Drag and Drop', () => ({
		component: DragDropComponent,
		props: {}
	}));
