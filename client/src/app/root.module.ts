import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RootComponent } from '@app/root.component';
import { FeatureModule } from '@app/features/feature.module';
import { ServiceModule } from '@app/services/service.module';
import { RouterModule } from '@app/router/router.module';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
	declarations: [RootComponent],
	imports: [
		SharedModule,
		BrowserModule,
		FeatureModule,
		ServiceModule,
		RouterModule,
		CoreModule
	],
	providers: [],
	bootstrap: [RootComponent]
})
export class AppModule {}
