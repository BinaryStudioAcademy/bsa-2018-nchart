import { NgModule } from '@angular/core';
import { StoreService } from '@app/services/store.service';
import { FormService } from '@app/services/form.service';
import { LoginService } from '@app/services/login.service';

@NgModule({
	providers: [StoreService, FormService, LoginService]
})
export class ServiceModule {}
