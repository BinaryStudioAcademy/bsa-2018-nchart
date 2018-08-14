import { NgModule } from '@angular/core';
import { StoreService } from '@app/services/store.service';
import { FormService } from '@app/services/form.service';

@NgModule({
	providers: [StoreService, FormService]
})
export class ServiceModule {}
