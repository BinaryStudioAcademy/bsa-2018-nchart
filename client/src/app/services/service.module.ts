import { NgModule } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { StoreService } from '@app/services/store.service';

@NgModule({
	providers: [ApiService, StoreService]
})
export class ServiceModule {}
