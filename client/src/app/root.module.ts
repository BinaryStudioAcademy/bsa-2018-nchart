import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RootComponent } from '@app/root.component';
import { FeatureModule } from '@app/features/feature.module';
import { ServiceModule } from '@app/services/service.module';
import { RouterModule } from '@app/router/router.module';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import { EffectModule } from '@app/store/effects/effect.module';
import { ReducerModule } from '@app/store/reducers/reducer.module';
import { ScrollToModule } from 'ng2-scroll-to-el';

@NgModule({
	declarations: [RootComponent],
	imports: [
		SharedModule,
		BrowserModule,
		FeatureModule,
		ServiceModule,
		RouterModule,
		CoreModule,
		EffectModule,
		ReducerModule,
		ScrollToModule.forRoot()
	],
	providers: [],
	bootstrap: [RootComponent]
})
export class AppModule {}
