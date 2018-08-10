import { NgModule } from '@angular/core';
import { UIKitModule } from '@app/shared/uikit.module';
import { FormFieldModule } from './components/form-field/form-field.module';
import { ActionButtonComponent } from './components/button/action-button/action-button.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
	imports: [UIKitModule, FormFieldModule],
	exports: [ActionButtonComponent, HeaderComponent, FormFieldModule],
	declarations: [ActionButtonComponent, HeaderComponent]
})
export class SharedModule {}
