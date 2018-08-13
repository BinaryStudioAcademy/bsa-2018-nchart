import { NgModule } from '@angular/core';
import { AppComponent } from '@app/core/app/app.component';
import { CompaniesComponent } from '@app/core/companies/companies.component';
import { CompanyComponent } from '@app/core/company/company.component';
import { LoginComponent } from '@app/core/login/login.component';
import { ProjectComponent } from '@app/core/project/project.component';
import { ProjectsComponent } from '@app/core/projects/projects.component';
import { LoadFilesComponent } from '@app/core/load-files/load-files.component';
import { RouterModule } from '@app/router/router.module';
import { APIModule } from '@app/api/api.module';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
	declarations: [
		AppComponent,
		CompaniesComponent,
		CompanyComponent,
		LoginComponent,
		ProjectComponent,
		ProjectsComponent,
		LoadFilesComponent
	],
	imports: [RouterModule, APIModule, SharedModule],
	exports: []
})
export class CoreModule {}
