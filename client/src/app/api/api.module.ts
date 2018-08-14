import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '@app/api/http/http.service';

@NgModule({
	imports: [HttpClientModule],
	providers: [HttpService]
})
export class APIModule {}
