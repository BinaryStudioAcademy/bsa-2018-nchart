import { NgModule } from '@angular/core';
import { StoreService } from '@app/services/store.service';
import { FormService } from '@app/services/form.service';
import { LoginService } from '@app/services/login.service';
import { ChartService } from '@app/services/chart.service';

@NgModule({
	providers: [StoreService, FormService, LoginService, ChartService]
})
export class ServiceModule {}
