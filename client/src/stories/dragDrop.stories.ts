import { storiesOf, moduleMetadata } from '@storybook/angular';
import '@storybook/addon-notes/register';
import { DragulaModule } from 'ng2-dragula';
import { DragDropComponent } from '../app/shared/components/dragDrop/drag-drop.component';

storiesOf('Drag and Drop', module)
	.addDecorator(
		moduleMetadata({
			imports: [DragulaModule.forRoot()],
			declarations: [DragDropComponent]
		})
	)
	.add('Simple Drag and Drop', () => ({
		component: DragDropComponent,
		props: {}
	}));
