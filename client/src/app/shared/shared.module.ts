import { NgModule } from '@angular/core';
import { UIKitModule } from '@app/shared/uikit.module';
import { FormFieldModule } from '@app/shared/components/form-field/form-field.module';
import { ActionButtonComponent } from '@app/shared/components/button/action-button/action-button.component';
import { HeaderModule } from '@app/shared/components/header/header.module';

@NgModule({
	imports: [UIKitModule, FormFieldModule, HeaderModule],
	exports: [ActionButtonComponent, FormFieldModule, HeaderModule],
	declarations: [ActionButtonComponent]
})
export class SharedModule {}
