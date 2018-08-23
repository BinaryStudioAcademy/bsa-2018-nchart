import { NgModule } from '@angular/core';
import { DraftprojectModule } from '@app/features/draftproject/draftproject.module';
import { AuthenticationModule } from '@app/features/authentication/authentication.module';
import { ExportPdfComponent } from '@app/features/export-pdf/export-pdf.component';

@NgModule({
	imports: [DraftprojectModule, AuthenticationModule],
	exports: [
		DraftprojectModule,
		AuthenticationModule,
		ExportPdfComponent
	],
	declarations: [ExportPdfComponent]
})
export class FeatureModule {}
