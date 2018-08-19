import { NgModule } from '@angular/core';
import { UIKitModule } from '@app/shared/uikit.module';
import { FormFieldModule } from '@app/shared/components/form-field/form-field.module';
import { ActionButtonComponent } from '@app/shared/components/button/action-button/action-button.component';
import { HeaderModule } from '@app/shared/components/header/header.module';
import { MainBlockComponent } from '@app/shared/components/main-block/main-block.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LinkComponent } from '@app/shared/components/link/link.component';
import { DragDropComponent } from '@app/shared/components/dragDrop/drag-drop.component';
import { LoadingSpinerComponent } from '@app/shared/components/loading-spiner/loading-spiner.component';
import { AngularResizedEventModule } from 'angular-resize-event';

@NgModule({
	imports: [
		UIKitModule,
		FormFieldModule,
		HeaderModule,
		BrowserAnimationsModule,
		AngularResizedEventModule
	],
	exports: [
		ActionButtonComponent,
		FormFieldModule,
		HeaderModule,
		UIKitModule,
		MainBlockComponent,
		DragDropComponent,
		LinkComponent,
		LoadingSpinerComponent
	],
	declarations: [
		ActionButtonComponent,
		DragDropComponent,
		MainBlockComponent,
		LinkComponent,
		LoadingSpiner
	]
})
export class SharedModule {}
