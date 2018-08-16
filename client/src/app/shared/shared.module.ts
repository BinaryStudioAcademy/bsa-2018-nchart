import { NgModule } from '@angular/core';
import { UIKitModule } from '@app/shared/uikit.module';
import { FormFieldModule } from '@app/shared/components/form-field/form-field.module';
import { ActionButtonComponent } from '@app/shared/components/button/action-button/action-button.component';
import { VirtualScrollTableComponent } from '@app/shared/components/virtual-scroll-table/virtual-scroll-table.component';
import { VirtualScrollModule } from 'angular2-virtual-scroll';
import { HeaderModule } from '@app/shared/components/header/header.module';
import { MainBlockComponent } from './components/main-block/main-block.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	imports: [
		UIKitModule,
		FormFieldModule,
		HeaderModule,
		BrowserAnimationsModule,
		VirtualScrollModule
	],
	exports: [
		ActionButtonComponent,
		FormFieldModule,
		HeaderModule,
		UIKitModule,
		MainBlockComponent,
		VirtualScrollTableComponent
	],
	declarations: [
		ActionButtonComponent,
		MainBlockComponent,
		VirtualScrollTableComponent
	]
})
export class SharedModule {}
