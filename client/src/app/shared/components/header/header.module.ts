import { NgModule } from '@angular/core';
import { FormFieldModule } from '@app/shared/components/form-field/form-field.module';
import { UIKitModule } from '@app/shared/uikit.module';
import { HeaderProfileComponent } from './header-profile/header-profile.component';
import { HeaderComponent } from '@app/shared/components/header/header.component';

const headerComponents = [HeaderProfileComponent, HeaderComponent];

@NgModule({
	imports: [UIKitModule, FormFieldModule],
	declarations: headerComponents,
	exports: headerComponents
})
export class HeaderModule {}
