import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@app/core/login/login.component';
import { AuthGuard } from '@app/services/guards/app-auth.guard';
import { ProjectComponent } from '@app/core/project/project.component';
import { ProjectsComponent } from '@app/core/projects/projects.component';
import { CompaniesComponent } from '@app/core/companies/companies.component';
import { CompanyComponent } from '@app/core/company/company.component';
import { AppComponent } from '@app/core/app/app.component';
import { ExportPdfComponent } from '@app/features/export-pdf/export-pdf.component';
import { LandingPageComponent } from '@app/core/landing-page/landing-page.component';

const appRoutes: Routes = [
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full'
	},
	{
		path: 'login',
		component: LoginComponent,
		canActivate: []
	},
	{
		path: 'app',
		component: AppComponent,
		canActivate: [AuthGuard],
		children: [
			// {
			// 	path: '',
			// 	redirectTo: 'project/draft',
			// 	pathMatch: 'full'
			// },
			{
				path: '',
				component: LandingPageComponent
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
				path: 'project/:id/pdf_preview',
				component: ExportPdfComponent
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
		redirectTo: 'app/project/draft'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule {}
