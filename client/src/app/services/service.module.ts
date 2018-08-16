import { NgModule } from '@angular/core';
import { StoreService } from '@app/services/store.service';
import { FormService } from '@app/services/form.service';
import {SourceService} from '@app/services/source.service';

@NgModule({
	providers: [StoreService, FormService, SourceService]
})
export class ServiceModule {}
