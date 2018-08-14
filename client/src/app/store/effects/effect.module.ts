import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '@app/store/effects/user.effects';
import { CompaniesEffects } from '@app/store/effects/companies.effects';
import { ProjectsEffects } from '@app/store/effects/projects.effects';
import { ChartsEffects } from '@app/store/effects/charts.effects';
import { LoadedDataEffects } from '@app/store/effects/loaded-data.effects';

@NgModule({
	imports: [
		EffectsModule.forRoot([
			UserEffects,
			CompaniesEffects,
			ChartsEffects,
			LoadedDataEffects,
			ProjectsEffects
		])
	]
})
export class EffectModule {}
