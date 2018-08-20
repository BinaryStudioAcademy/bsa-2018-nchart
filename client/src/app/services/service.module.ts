import { NgModule } from '@angular/core';
import { StoreService } from '@app/services/store.service';
import { FormService } from '@app/services/form.service';
import { LoginService } from '@app/services/login.service';
import { ChartService } from '@app/services/chart.service';
import { SourceService } from '@app/services/source.service';
import { ProjectService } from '@app/services/project.service';
import { TokenService } from '@app/services/token.service';

@NgModule({
	providers: [
		StoreService,
		FormService,
		LoginService,
		SourceService,
		ProjectService,
		TokenService,
		ChartService
	]
})
export class ServiceModule {}
