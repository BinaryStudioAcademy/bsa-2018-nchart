import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RootComponent } from '@app/root.component';
import { FeatureModule } from '@app/features/feature.module';
import { ServiceModule } from '@app/services/service.module';
import { MainComponent } from '@app/main/main.component';
import { LoginComponent } from '@app/login/login.component';
import { RegistrationComponent } from '@app/registration/registration.component';
import { ProjectComponent } from '@app/main/project/project.component';
import { ProjectsComponent } from '@app/main/projects/projects.component';
import { CompanyComponent } from '@app/main/company/company.component';
import { CompaniesComponent } from '@app/main/companies/companies.component';
import { RouterModule } from '@app/router/router.module';

@NgModule({
	declarations: [
		RootComponent,
		MainComponent,
		LoginComponent,
		RegistrationComponent,
		ProjectComponent,
		ProjectsComponent,
		CompanyComponent,
		CompaniesComponent
	],
	imports: [BrowserModule, FeatureModule, ServiceModule, RouterModule],
	providers: [],
	bootstrap: [RootComponent]
})
export class AppModule {}
