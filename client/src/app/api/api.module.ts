import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '@app/api/http/http.service';
import { UserDomainService } from '@app/api/domains/user/user-domain.service';

@NgModule({
	imports: [HttpClientModule],
	providers: [HttpService, UserDomainService]
})
export class APIModule {}
