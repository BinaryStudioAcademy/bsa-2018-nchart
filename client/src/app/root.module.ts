import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RootComponent } from '@app/root.component';
import { FeatureModule } from './features/feature.module';
import { ServiceModule } from './services/service.module';

@NgModule({
	declarations: [RootComponent],
	imports: [BrowserModule, FeatureModule, ServiceModule],
	providers: [],
	bootstrap: [RootComponent]
})
export class AppModule {}
