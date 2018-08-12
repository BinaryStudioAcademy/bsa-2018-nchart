import { NgModule } from '@angular/core';
import { DraftprojectModule } from '@app/features/draftproject/draftproject.module';

@NgModule({
	imports: [DraftprojectModule],
	exports: [DraftprojectModule]
})
export class FeatureModule {}
