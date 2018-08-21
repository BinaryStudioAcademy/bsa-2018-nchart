import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '@app/api/http/http.service';
import { ProjectDomainService } from '@app/api/domains/project/project-domain.service';
import { DatasetDomainService } from '@app/api/domains/source/dataset-domain.service';

@NgModule({
	imports: [HttpClientModule],
	providers: [HttpService, ProjectDomainService, DatasetDomainService]
})
export class APIModule {}
