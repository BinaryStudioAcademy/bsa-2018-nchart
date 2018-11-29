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
import { DashboardComponent } from './dashboard/dashboard.component';
import { ButtonComponent } from '@app/shared/components/button/button/button.component';
import { ChartComponent } from '@app/features/draftproject/custom-chart/chart/chart.component';
import { InputTextareaComponent } from '@app/shared/components/form-field/input-textarea/input-textarea.component';
import { DashboardTextblockComponent } from './dashboard/dashboard.components/dashboard-textblock/dashboard-textblock.component';

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
		ProjectsCardComponent,
		DashboardComponent,
		DashboardTextblockComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		APIModule,
		SharedModule,
		FeatureModule,
		FormFieldModule
	],
	entryComponents: [ChartComponent, ButtonComponent,DashboardTextblockComponent,InputTextareaComponent],
	exports: []
})
export class CoreModule {}
