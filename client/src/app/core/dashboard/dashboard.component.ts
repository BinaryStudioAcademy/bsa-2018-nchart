import {
	AfterViewInit,
	Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, QueryList, ViewChildren, ViewContainerRef,
} from '@angular/core';
import {DisplayGrid, GridsterConfig, GridsterItem, GridType} from 'angular-gridster2';
import {ButtonComponent} from '@app/shared/components/button/button/button.component';
import {ChartComponent} from '@app/features/draftproject/custom-chart/chart/chart.component';
import {getActiveChart, getAllUserChartTypes, getCustomizeSettings, getData} from '@app/store/selectors/userCharts';
import {StoreService} from '@app/services/store.service';
import {ScatterplotChartService} from '@app/services/charts/scatterplot-chart.service';
import {PieChartService} from '@app/services/charts/pie-chart.service';
import {BarChartService} from '@app/services/charts/bar-chart.service';
import {take, withLatestFrom} from 'rxjs/internal/operators';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

	displayModalDashboard = true;
	options: GridsterConfig;
	dashboard: Array<GridsterItem>;
	fromRemove = false;
	components: ComponentRef<any>[] = [];
	@ViewChildren('host', {read: ViewContainerRef}) hosts: QueryList<ViewContainerRef>;

	chartType;
	customizeSettings;
	disconnect;
	data;
	activeTab: number;
	userCharts;

	constructor(private barChartService: BarChartService,
				private pieChartService: PieChartService,
				private scatterplotChartService: ScatterplotChartService,
				private storeService: StoreService,
				private componentFactoryResolver: ComponentFactoryResolver) {
	}

	ngOnInit() {
		this.options = {
			gridType: GridType.Fit,
			displayGrid: DisplayGrid.Always,
			pushItems: true,
			draggable: {
				enabled: true
			},
			resizable: {
				enabled: true
			},
			minCols: 99,
			maxCols: 99,
			minRows: 70,
			maxRows: 70,
			maxItemCols: 99,
			minItemCols: 10,
			maxItemRows: 77,
			minItemRows: 10,
			maxItemArea: 6930,
			minItemArea: 100,
			defaultItemCols: 12,
			defaultItemRows: 12
		};


		this.dashboard = [
			// {cols: 2, rows: 1, y: 0, x: 0},
			// {cols: 2, rows: 2, y: 0, x: 2},
			// {cols: 1, rows: 1, y: 0, x: 4},
			// {cols: 3, rows: 2, y: 1, x: 4},
			// {cols: 1, rows: 1, y: 4, x: 5},
			// {cols: 1, rows: 1, y: 2, x: 1},
			// {cols: 2, rows: 2, y: 5, x: 5},
			// {cols: 2, rows: 2, y: 3, x: 2},
			// {cols: 2, rows: 1, y: 2, x: 2},
			// {cols: 1, rows: 1, y: 3, x: 4},
			// {cols: 1, rows: 1, y: 0, x: 6}
		];


		this.disconnect = this.storeService.connect([
			{
				selector: getActiveChart(),
				subscriber: t => {
					if (t) {
						this.chartType = t.sysName;
					}
				}
			},
			{
				selector: getAllUserChartTypes(),
				subscriber: t => {
					this.userCharts = t;
				}
			},
			{
				selector: getCustomizeSettings(),
				subscriber: t => {
					this.customizeSettings = t;
				}
			},
			{
				selector: getData(),
				subscriber: data => {
					if (!!data.length) {
						switch (this.chartType) {
							case 'barChart':
								this.data = this.barChartService.getData(data);
								break;
							case 'pieChart':
								this.data = this.pieChartService.getData(data);
								break;
							case 'scatterplot':
								this.data = this.scatterplotChartService.getData(
									data
								);
								break;

							default:
								break;
						}
					}
				}
			}
		]);

	}

	ngAfterViewInit(): void {
		this.hosts.changes.subscribe(
			() => {
				if (this.fromRemove) {
					this.fromRemove = false;
					return;
				}
				const host = this.hosts.last;
				const item = this.dashboard[this.dashboard.length - 1];

				if (item.data && item.data.component) {
					const componentFactory = this.componentFactoryResolver.resolveComponentFactory(item.data.component);
					const component = host.createComponent(componentFactory);
					if ((component.instance instanceof ChartComponent)) {
						(component.instance as ChartComponent).chartType = item.data.inputs.chartType;
						(component.instance as ChartComponent).data = item.data.inputs.data;
						(component.instance as ChartComponent).customizeSettings = item.data.inputs.customizeSettings;
					}

					if ((component.instance instanceof ButtonComponent)) {
						(component.instance as ButtonComponent).label = 'WORKS!!';
					}

					component.changeDetectorRef.detectChanges();
					this.components.push(component);
				}

			}
		);
	}

	ngOnDestroy(): void {
		this.components.forEach(c => c.changeDetectorRef.detach());
	}

	changedOptions() {
		if (this.options.api && this.options.api.optionsChanged) {
			this.options.api.optionsChanged();
		}
	}

	removeItem(item) {
		this.fromRemove = true;
		const index = this.dashboard.indexOf(item);
		this.dashboard.splice(index, 1);
		this.components.splice(index, 1);
	}

	addCheck() {
		this.dashboard.push({
			x: 0,
			y: 0,
			cols: 20,
			rows: 20,
			data: {
				component: ChartComponent,
				inputs: {
					data: this.data,
					chartType: this.chartType,
					customizeSettings: this.customizeSettings
				}
			}
		});
	}

	toggleModal() {
		this.displayModalDashboard = !this.displayModalDashboard;
	}

	addItem() {
		this.dashboard.push({x: 0, y: 0, cols: 20, rows: 20});
	}

	onChange(e) {
		this.activeTab = e.index;
	}

	addCharts(chart) {
		const chartId = chart.userChartsId[0];

		this.storeService.createSubscription(
			getCustomizeSettings(chartId)
		).pipe(
			withLatestFrom(this.storeService.createSubscription(getData(chartId))),
			take(1)
		).subscribe(([customizeSettings, data]) => {
			let dataFormated;

			switch (chart.sysName) {
				case 'barChart':
					dataFormated = this.barChartService.getData(data);
					break;
				case 'pieChart':
					dataFormated = this.pieChartService.getData(data);
					break;
				case 'scatterplot':
					dataFormated = this.scatterplotChartService.getData(
						data
					);
					break;
				default:
					break;
			}

			this.dashboard.push({
				x: 0,
				y: 0,
				cols: 20,
				rows: 20,
				data: {
					component: ChartComponent,
					inputs: {
						customizeSettings,
						data: dataFormated,
						chartType: chart.sysName
					}
				}
			});
		});

		// userChartsId.forEach((v, i) => {
		//
		// })
	}
}
