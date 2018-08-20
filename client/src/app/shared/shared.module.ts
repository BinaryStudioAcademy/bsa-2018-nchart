import { NgModule } from '@angular/core';
import { UIKitModule } from '@app/shared/uikit.module';
import { FormFieldModule } from '@app/shared/components/form-field/form-field.module';
import { ActionButtonComponent } from '@app/shared/components/button/action-button/action-button.component';
import { HeaderModule } from '@app/shared/components/header/header.module';
import { MainBlockComponent } from '@app/shared/components/main-block/main-block.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LinkComponent } from '@app/shared/components/link/link.component';
import { DragDropComponent } from '@app/shared/components/dragDrop/drag-drop.component';
import { ChartsModule } from '@app/shared/components/charts/charts.module';

@NgModule({
	imports: [
		UIKitModule,
		FormFieldModule,
		HeaderModule,
		BrowserAnimationsModule,
		ChartsModule
	],
	exports: [
		ActionButtonComponent,
		FormFieldModule,
		HeaderModule,
		ChartsModule,
		UIKitModule,
		MainBlockComponent,
		DragDropComponent,
		LinkComponent
	],
	declarations: [
		ActionButtonComponent,
		DragDropComponent,
		MainBlockComponent,
		LinkComponent
	]
})
export class SharedModule {}
