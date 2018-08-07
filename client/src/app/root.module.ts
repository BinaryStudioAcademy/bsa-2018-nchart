import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RootComponent } from '@app/root.component';
import { FeatureModule } from './features/feature.module';
import { ServiceModule } from './services/service.module';
import { EffectModule } from './store/effects/effect.module';
import { ReducerModule } from './store/reducers/reducer.module';

@NgModule({
	declarations: [RootComponent],
	imports: [
		BrowserModule,
		FeatureModule,
		ServiceModule,
		EffectModule,
		ReducerModule
	],
	providers: [],
	bootstrap: [RootComponent]
})
export class AppModule {}
