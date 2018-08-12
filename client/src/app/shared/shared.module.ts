import { NgModule } from '@angular/core';
import { UIKitModule } from '@app/shared/uikit.module';
import { ActionButtonComponent } from './components/button/action-button/action-button.component';
// import { ButtonComponent } from './components/button/button/button.component';
import { TabPanelComponent } from './components/tabs/tab-panel/tab-panel.component';
import { TabViewComponent } from './components/tabs/tab-view/tab-view.component';
import { FormFieldModule } from './components/form-field/form-field.module';

@NgModule({
	imports: [UIKitModule, FormFieldModule],
	exports: [
		ActionButtonComponent,
		// ButtonComponent,
		TabPanelComponent,
		TabViewComponent,
		FormFieldModule
	],
	declarations: [
		ActionButtonComponent,
		TabPanelComponent,
		TabViewComponent,
		// ButtonComponent
	]
})
export class SharedModule {}
