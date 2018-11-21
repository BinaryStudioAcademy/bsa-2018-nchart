import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@app/core/login/login.component';
import { AppAuthGuard } from '@app/services/guards/app-auth.guard';
import { LoginAuthGuard } from '@app/services/guards/login-auth.guard';
import { ProjectComponent } from '@app/core/project/project.component';
import { ProjectsComponent } from '@app/core/projects/projects.component';
import { CompaniesComponent } from '@app/core/companies/companies.component';
import { CompanyComponent } from '@app/core/company/company.component';
import { AppComponent } from '@app/core/app/app.component';
import { ExportPdfComponent } from '@app/features/export-pdf/export-pdf.component';
import { LandingPageComponent } from '@app/core/landing-page/landing-page.component';
import { ProjectGuard } from '@app/services/guards/project.guard';
import { DashboardComponent } from '@app/core/dashboard/dashboard.component';

const appRoutes: Routes = [
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full'
	},
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [LoginAuthGuard]
	},
	{
		path: 'app',
		component: AppComponent,
		canActivate: [AppAuthGuard],
		children: [
			{
				path: '',
				component: LandingPageComponent
			},
			{
				path: 'project/draft',
				component: ProjectComponent,
				canDeactivate: [ProjectGuard],
				canActivate: [ProjectGuard]
			},
			{
				path: 'project/:id',
				component: ProjectComponent,
				canActivate: [ProjectGuard]
			},
			{
				path: 'project/:id/dashboard',
				component: DashboardComponent,
				canActivate: [ProjectGuard]
			},
			{
				path: 'project/:id/pdf_preview',
				component: ExportPdfComponent,
				canActivate: [ProjectGuard]
			},
			{
				path: 'projects',
				component: ProjectsComponent,
				canActivate: [ProjectGuard]
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
		redirectTo: 'app/project/draft'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule {}
