import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { StoreService } from '@app/services/store.service';
import { UserMappingColumn } from '@app/models/user-chart-store.model';
import {
	mappingColumns,
	mappingDimensions,
	getData
} from '@app/store/selectors/userCharts';
import { SetDimension } from '@app/store/actions/charts/charts.actions';
import {
	RemoveDimension,
	RemoveAllDimension
} from '@app/store/actions/charts/charts.actions';

@Component({
	selector: 'app-custom-settings',
	templateUrl: './custom-settings.component.html',
	styleUrls: ['./custom-settings.component.sass']
})
export class CustomSettingsComponent implements OnInit, OnDestroy {
	constructor(private storeService: StoreService, element: ElementRef) {
		this.onMappingColumnsUpdate = this.onMappingColumnsUpdate.bind(this);
	}

	disconnect: () => void;
	columns: UserMappingColumn[] = [];
	dimensionsSettings;
	data: any[][];

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
			},
			{
				selector: getData(),
				subscriber: d => (this.data = d)
			}
		]);
	}

	onMappingColumnsUpdate(columns: UserMappingColumn[]) {
		this.columns = columns;
	}

	ngOnDestroy(): void {
		this.disconnect();
	}

	onSetDimension(payload) {
		this.storeService.dispatch(new SetDimension(payload));
	}

	onRemoveDimension(payload) {
		this.storeService.dispatch(new RemoveDimension(payload));
	}

	onRemoveAllDimension() {
		this.storeService.dispatch(new RemoveAllDimension());
	}
}
