import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '@app/login/login.component';
import { RegistrationComponent } from '@app/registration/registration.component';
import { MainComponent } from '@app/main/main.component';
import { ProjectComponent } from '@app/main/project/project.component';
import { ProjectsComponent } from '@app/main/projects/projects.component';
import { CompanyComponent } from '@app/main/company/company.component';
import { CompaniesComponent } from '@app/main/companies/companies.component';

import { AuthGuard } from '@app/guards/auth.guard';

const appRoutes: Routes = [
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full'
	},
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'register',
		component: RegistrationComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'app',
		component: MainComponent,
		children: [
			{
				path: '',
				redirectTo: 'project/draft',
				pathMatch: 'full'
			},
			{
				path: 'project/draft',
				component: ProjectComponent
			},
			{
				path: 'project/:id',
				component: ProjectComponent
			},
			{
				path: 'projects',
				component: ProjectsComponent
			},
			{
				path: 'companies',
				component: CompaniesComponent
			},
			{
				path: 'company/:id',
				component: CompanyComponent
			}
		]
	},
	{
		path: '**',
		component: LoginComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
