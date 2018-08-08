import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RootComponent } from '@app/root.component';
import { FeatureModule } from '@app/features/feature.module';
import { ServiceModule } from '@app/services/service.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
	declarations: [RootComponent],
	imports: [BrowserModule, FeatureModule, ServiceModule, SharedModule],
	exports: [],
	providers: [],
	bootstrap: [RootComponent]
})
export class AppModule {}
