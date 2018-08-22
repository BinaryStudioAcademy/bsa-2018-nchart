import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from '@app/services/store.service';
import {
	mappingColumns,
	mappingDimensions
} from '@app/store/selectors/charts.selectors';
import { UserMappingColumn } from '@app/models/user-chart-store.model';

@Component({
	selector: 'app-custom-settings',
	templateUrl: './custom-settings.component.html',
	styleUrls: ['./custom-settings.component.sass']
})
export class CustomSettingsComponent implements OnInit, OnDestroy {
	constructor(private storeService: StoreService) {
		this.onMappingColumnsUpdate = this.onMappingColumnsUpdate.bind(this);
	}

	disconnect: () => void;
	columns: UserMappingColumn[] = [];
	dimensionsSettings;

	ngOnInit() {
		this.disconnect = this.storeService.connect([
			{
				selector: mappingColumns(),
				subscriber: this.onMappingColumnsUpdate
			},
			{
				selector: mappingDimensions(),
				subscriber: d => {
					this.dimensionsSettings = d;
				}
			}
		]);
	}

	onMappingColumnsUpdate(columns: UserMappingColumn[]) {
		this.columns = columns;
	}

	ngOnDestroy(): void {
		this.disconnect();
	}
}
