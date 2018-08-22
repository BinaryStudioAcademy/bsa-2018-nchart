import { NgModule } from '@angular/core';
import { DraftprojectModule } from '@app/features/draftproject/draftproject.module';
import { AuthenticationModule } from '@app/features/authentication/authentication.module';
import { ExportPdfComponent } from '@app/features/export-pdf/export-pdf.component';
import { HttpModule } from '@angular/http';

@NgModule({
	imports: [DraftprojectModule, AuthenticationModule, HttpModule],
	exports: [
		DraftprojectModule,
		AuthenticationModule,
		ExportPdfComponent,
		HttpModule
	],
	declarations: [ExportPdfComponent]
})
export class FeatureModule {}
