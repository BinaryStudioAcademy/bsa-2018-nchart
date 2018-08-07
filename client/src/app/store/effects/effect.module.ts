import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '@app/store/effects/user.effects';

@NgModule({
	imports: [EffectsModule.forRoot([UserEffects])]
})
export class EffectModule {}
