import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from '@app/services/store.service';
import { isUserLoading } from '@app/store/selectors/user.selectors';

@Component({
	selector: 'app-app',
	templateUrl: 'app.component.html',
	styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
	isLoading: boolean;

	private disconnectStore: () => void;

	constructor(private storeService: StoreService) {}

	ngOnInit() {
		this.disconnectStore = this.storeService.connect([
			{
				subscriber: isLoading => {
					this.isLoading = isLoading;
				},
				selector: isUserLoading()
			}
		]);
	}

	ngOnDestroy() {
		this.disconnectStore();
	}
}
