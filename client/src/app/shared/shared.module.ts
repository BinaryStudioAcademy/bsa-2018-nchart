import { NgModule } from '@angular/core';
import { UIKitModule } from '@app/shared/uikit.module';
import { FormFieldModule } from '@app/shared/components/form-field/form-field.module';
import { ActionButtonComponent } from '@app/shared/components/button/action-button/action-button.component';
import { VirtualScrollTableComponent } from '@app/shared/components/virtual-scroll-table/virtual-scroll-table.component';
import { VirtualScrollModule } from 'angular2-virtual-scroll';

@NgModule({
	imports: [UIKitModule, FormFieldModule, VirtualScrollModule],
	exports: [
		ActionButtonComponent,
		FormFieldModule,
		VirtualScrollTableComponent
	],
	declarations: [ActionButtonComponent, VirtualScrollTableComponent]
})
export class SharedModule {}
