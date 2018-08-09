import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '@app/store/effects/user.effects';
import { CompaniesEffects } from '@app/store/effects/companies.effects';
import { ProjectsEffects } from '@app/store/effects/projects.effects';

@NgModule({
	imports: [
		EffectsModule.forRoot([UserEffects, CompaniesEffects, ProjectsEffects])
	]
})
export class EffectModule {}
