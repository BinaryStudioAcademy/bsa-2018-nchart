import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
	initialState,
	reducersToken,
	reducersProvider,
	CustomRouterStateSerializer
} from '@app/store/reducers';
import {
	RouterStateSerializer,
	StoreRouterConnectingModule
} from '@ngrx/router-store';

@NgModule({
	imports: [
		StoreModule.forRoot(reducersToken, { initialState }),
		StoreDevtoolsModule.instrument(),
		StoreRouterConnectingModule.forRoot({
			stateKey: 'router'
		})
	],
	providers: [
		reducersProvider,
		{
			provide: RouterStateSerializer,
			useClass: CustomRouterStateSerializer
		}
	]
})
export class ReducerModule {}
