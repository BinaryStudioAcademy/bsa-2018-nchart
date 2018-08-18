import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '@app/api/http/http.service';
import { ProjectDomainService } from '@app/api/domains/project';

@NgModule({
	imports: [HttpClientModule],
	providers: [HttpService, ProjectDomainService]
})
export class APIModule {}
