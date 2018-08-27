import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '@app/store/effects/user.effects';
import { CompaniesEffects } from '@app/store/effects/companies.effects';
import { ProjectsEffects } from '@app/store/effects/projects.effects';
import { ChartsEffects } from '@app/store/effects/charts.effects';
import { DatasetEffects } from '@app/store/effects/dataset.effects';
import { RouterEffects } from '@app/store/effects/router.effects';
import { ExportEffects } from '@app/store/effects/export.effects';

@NgModule({
	imports: [
		EffectsModule.forRoot([
			UserEffects,
			CompaniesEffects,
			ChartsEffects,
			DatasetEffects,
			ProjectsEffects,
			RouterEffects,
			ExportEffects
		])
	]
})
export class EffectModule {}
