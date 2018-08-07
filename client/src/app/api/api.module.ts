import { NgModule } from '@angular/core';
import { ApiService } from '@app/api/api.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	imports: [HttpClientModule],
	providers: [ApiService]
})
export class APIModule {}
