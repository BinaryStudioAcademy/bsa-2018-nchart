import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { initialState, reducersToken, reducersProvider } from '@app/store/reducers';

@NgModule({
	imports: [
		StoreModule.forRoot(reducersToken, { initialState }),
		StoreDevtoolsModule.instrument()
	],
	providers: [reducersProvider]
})
export class ReducerModule {}
