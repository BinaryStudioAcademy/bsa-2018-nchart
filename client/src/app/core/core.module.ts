import { NgModule } from '@angular/core';
import { AppComponent } from '@app/core/app/app.component';
import { CompaniesComponent } from '@app/core/companies/companies.component';
import { CompanyComponent } from '@app/core/company/company.component';
import { LoginComponent } from '@app/core/login/login.component';
import { ProjectComponent } from '@app/core/project/project.component';
import { ProjectsComponent } from '@app/core/projects/projects.component';
import { RouterModule } from '@app/router/router.module';
import { APIModule } from '@app/api/api.module';
import { SharedModule } from '@app/shared/shared.module';
import { FeatureModule } from '@app/features/feature.module';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from '@app/core/landing-page/landing-page.component';
import { FormFieldModule } from '@app/shared/components/form-field/form-field.module';
import { ProjectTabsComponent } from '@app/core/project/tabs/project-tabs.component';
import { ProjectsCardComponent } from '@app/core/projects/project-card/projects-card.component';

@NgModule({
	declarations: [
		AppComponent,
		CompaniesComponent,
		CompanyComponent,
		LoginComponent,
		ProjectComponent,
		ProjectsComponent,
		LandingPageComponent,
		ProjectTabsComponent,
		ProjectsCardComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		APIModule,
		SharedModule,
		FeatureModule,
		FormFieldModule
	],
	exports: []
})
export class CoreModule {}
