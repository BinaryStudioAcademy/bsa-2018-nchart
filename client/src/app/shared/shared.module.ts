import { NgModule } from '@angular/core';
import { UIKitModule } from '@app/shared/uikit.module';
import { FormFieldModule } from '@app/shared/components/form-field/form-field.module';
import { ActionButtonComponent } from '@app/shared/components/button/action-button/action-button.component';

@NgModule({
	imports: [UIKitModule, FormFieldModule],
	exports: [ActionButtonComponent, FormFieldModule],
	declarations: [ActionButtonComponent]
})
export class SharedModule {}
