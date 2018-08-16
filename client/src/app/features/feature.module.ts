import { NgModule } from '@angular/core';
import { DraftprojectModule } from '@app/features/draftproject/draftproject.module';
import { AuthenticationModule } from '@app/features/authentication/authentication.module';

@NgModule({
	imports: [DraftprojectModule, AuthenticationModule],
	exports: [DraftprojectModule, AuthenticationModule]
})
export class FeatureModule {}
