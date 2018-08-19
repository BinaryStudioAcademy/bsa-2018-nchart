import { NgModule } from '@angular/core';
import { StoreService } from '@app/services/store.service';
import { FormService } from '@app/services/form.service';
import { LoginService } from '@app/services/login.service';
import { SourceService } from '@app/services/source.service';
import { ProjectService } from './project.service';

@NgModule({
	providers: [
		StoreService,
		FormService,
		LoginService,
		SourceService,
		ProjectService
	]
})
export class ServiceModule {}
