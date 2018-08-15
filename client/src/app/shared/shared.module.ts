import { NgModule } from '@angular/core';
import { UIKitModule } from '@app/shared/uikit.module';
import { FormFieldModule } from '@app/shared/components/form-field/form-field.module';
import { ActionButtonComponent } from '@app/shared/components/button/action-button/action-button.component';
import { HeaderModule } from '@app/shared/components/header/header.module';
import { DragDropComponent } from '../shared/components/dragDrop/drag-drop.component';

@NgModule({
	imports: [UIKitModule, FormFieldModule, HeaderModule],
	exports: [
		ActionButtonComponent,
		DragDropComponent,
		FormFieldModule,
		HeaderModule
	],
	declarations: [ActionButtonComponent, DragDropComponent]
})
export class SharedModule {}
