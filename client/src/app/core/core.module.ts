import { NgModule } from '@angular/core';
import { AppComponent } from '@app/core/app/app.component';
import { CompaniesComponent } from '@app/core/companies/companies.component';
import { CompanyComponent } from '@app/core/company/company.component';
import { LoginComponent } from '@app/core/login/login.component';
import { ProjectComponent } from '@app/core/project/project.component';
import { ProjectsComponent } from '@app/core/projects/projects.component';
import { RouterModule } from '@app/router/router.module';
import { APIModule } from '@app/api/api.module';

@NgModule({
	declarations: [
		AppComponent,
		CompaniesComponent,
		CompanyComponent,
		LoginComponent,
		ProjectComponent,
		ProjectsComponent
	],
	imports: [RouterModule, APIModule],
	exports: []
})
export class CoreModule {}
