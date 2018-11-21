import {
	AfterViewInit,
	Component,
	ComponentFactoryResolver,
	ComponentRef,
	OnDestroy,
	OnInit,
	QueryList,
	ViewChild,
	ViewChildren,
	ViewContainerRef
} from '@angular/core';
import {
	DisplayGrid,
	GridsterConfig,
	GridsterItem,
	GridType
} from 'angular-gridster2';
import { ButtonComponent } from '@app/shared/components/button/button/button.component';
import { ChartComponent } from '@app/features/draftproject/custom-chart/chart/chart.component';
import {
	getActiveChart,
	getAllUserChartTypes,
	getCustomizeSettings,
	getData
} from '@app/store/selectors/userCharts';
import { StoreService } from '@app/services/store.service';
import { ScatterplotChartService } from '@app/services/charts/scatterplot-chart.service';
import { PieChartService } from '@app/services/charts/pie-chart.service';
import { BarChartService } from '@app/services/charts/bar-chart.service';
import { AlluvialDiagramChartService } from '@app/services/charts/alluvial-diagram-chart.service';
import { WorldMapChartService } from '@app/services/charts/world-map-chart.service';
import { take, withLatestFrom } from 'rxjs/internal/operators';
import { LoadOneProject } from '@app/store/actions/projects/projects.actions';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/index';
import { BarChartComponent } from '@app/shared/components/charts/bar-chart/bar-chart.component';
import { PieChartComponent } from '@app/shared/components/charts/pie-chart/pie-chart.component';
import { ScatterplotChartComponent } from '@app/shared/components/charts/scatterplot-chart/scatterplot-chart.component';
import { AlluvialDiagramChartComponent } from '@app/shared/components/charts/alluvial-diagram-chart/alluvial-diagram-chart.component';
import { WorldMapChartComponent } from '@app/shared/components/charts/world-map-chart/world-map-chart.component';
import { ExportDashboardBusService } from '@app/services/export-dashboard-bus.service';
import { ExportType } from '@app/models/export.model';
import { ExportProject } from '@app/store/actions/export/export.actions';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
	displayModalDashboard = true;
	options: GridsterConfig;
	dashboard: Array<GridsterItem>;
	routeParams$: Subscription;
	fromRemove = false;
	components: ComponentRef<any>[] = [];
	@ViewChildren('host', { read: ViewContainerRef })
	hosts: QueryList<ViewContainerRef>;
	@ViewChild('dashboardEl')
	dashboardEl: any;
	exportBusResponseDashboard: Subscription;

	chartType;
	customizeSettings;
	disconnect;
	data;
	activeTab: number;
	userCharts;
	horizontalLayout = true;

	constructor(
		private barChartService: BarChartService,
		private route: ActivatedRoute,
		private pieChartService: PieChartService,
		private scatterplotChartService: ScatterplotChartService,
		private storeService: StoreService,
		private componentFactoryResolver: ComponentFactoryResolver,
		private alluvialDiagramChartService: AlluvialDiagramChartService,
		private worldMapChartService: WorldMapChartService,
		private exportDashboardBus: ExportDashboardBusService
	) {}

	changeLayout() {
		if (this.horizontalLayout) {
			this.options = {
				gridType: GridType.Fixed,
				displayGrid: DisplayGrid.Always,
				pushItems: true,
				draggable: {
					enabled: true
				},
				resizable: {
					enabled: true
				},
				minCols: 70,
				maxCols: 70,
				minRows: 99,
				maxRows: 99,
				// maxItemCols: 77,
				// minItemCols: 10,
				// maxItemRows: 99,
				// minItemRows: 10,
				// maxItemArea: 6930,
				// minItemArea: 100,
				// defaultItemCols: 12,
				// defaultItemRows: 12,
				margin: 0,
				fixedColWidth: 10,
				fixedRowHeight: 10
			};
		} else {
			this.options = {
				gridType: GridType.Fixed,
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
				defaultItemRows: 12,
				margin: 0,
				fixedColWidth: 10,
				fixedRowHeight: 10
			};
		}
		this.horizontalLayout = !this.horizontalLayout;
	}

	getClasses() {
		return {
			horizontal: this.horizontalLayout,
			vertical: !this.horizontalLayout
		};
	}

	ngOnInit() {
		this.routeParams$ = this.route.params.subscribe(
			(params: { id?: number }) => {
				const { id } = params;
				if (id) {
					this.storeService.dispatch(
						new LoadOneProject({ projectId: id + '' })
					);
				}
			}
		);

		this.options = {
			width: 'auto',
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
			defaultItemRows: 12,
			margin: 0,
			fixedColWidth: 10,
			fixedRowHeight: 10
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
		this.exportBusResponseDashboard = this.exportDashboardBus.responseObservable.subscribe(
			dashboard => {
				this.storeService.dispatch(
					new ExportProject({
						id: 1,
						type: 'pdf' as ExportType,
						filename: 'report',
						dashboard: dashboard
					})
				);
			}
		);
	}

	ngAfterViewInit(): void {
		this.hosts.changes.subscribe(() => {
			if (this.fromRemove) {
				this.fromRemove = false;
				return;
			}
			const host = this.hosts.last;
			const item = this.dashboard[this.dashboard.length - 1];

			if (item && item.data && item.data.component) {
				const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
					item.data.component
				);
				const componentRef = host.createComponent(componentFactory);
				if (componentRef.instance instanceof ChartComponent) {
					const instance: ChartComponent = componentRef.instance as ChartComponent;

					instance.chartType = item.data.inputs.chartType;
					instance.data = item.data.inputs.data;
					instance.customizeSettings =
						item.data.inputs.customizeSettings;
				}

				if (componentRef.instance instanceof ButtonComponent) {
					const instance: ButtonComponent = componentRef.instance as ButtonComponent;

					instance.label = item.data.inputs.label;
				}

				componentRef.changeDetectorRef.detectChanges();
				this.components.push(componentRef);
			}
		});
	}

	ngOnDestroy(): void {
		this.routeParams$.unsubscribe();
		this.components.forEach(c => c.changeDetectorRef.detach());
		this.exportBusResponseDashboard.unsubscribe();
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

	addBtn() {
		this.dashboard.push({
			x: 0,
			y: 0,
			cols: 20,
			rows: 20,
			data: {
				component: ButtonComponent,
				inputs: {
					label: 'label' + Date()
				}
			}
		});
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
		this.dashboard.push({ x: 0, y: 0, cols: 20, rows: 20 });
	}

	onChange(e) {
		this.activeTab = e.index;
	}

	getNormalName(sysName) {
		switch (sysName) {
			case 'barChart':
				return 'Bar Chart';
			case 'pieChart':
				return 'Pie Chart';
			case 'scatterplot':
				return 'Scatter Plot';
			case 'ganttChart':
				return 'Gantt Chart';
			case 'alluvialDiagram':
				return 'Alluvial Diagram';
			case 'worldMap':
				return 'World Map';
		}
	}

	addCharts(chart) {
		// userChartsId.forEach((v, i) => {
		const chartId = chart.userChartsId[0];
		// })
		this.storeService
			.createSubscription(getCustomizeSettings(chartId))
			.pipe(
				withLatestFrom(
					this.storeService.createSubscription(getData(chartId))
				),
				take(1)
			)
			.subscribe(([customizeSettings, data]) => {
				let dataFormated;
				const item = {
					x: 0,
					y: 0,
					cols: 20,
					rows: 20,
					data: {
						component: null,
						inputs: {
							customizeSettings,
							data: null,
							chartType: chart.sysName
						}
					}
				};

				switch (chart.sysName) {
					case 'barChart':
						dataFormated = this.barChartService.getData(data);
						item.data.component = BarChartComponent;
						break;
					case 'pieChart':
						dataFormated = this.pieChartService.getData(data);
						item.data.component = PieChartComponent;
						break;
					case 'scatterplot':
						dataFormated = this.scatterplotChartService.getData(
							data
						);
						item.data.component = ScatterplotChartComponent;
						break;
					case 'alluvialDiagram':
						dataFormated = this.alluvialDiagramChartService.getData(
							data
						);
						item.data.component = AlluvialDiagramChartComponent;
						break;
					case 'worldMap':
						dataFormated = this.worldMapChartService.getData(data);
						item.data.component = WorldMapChartComponent;
						break;
					default:
						break;
				}

				this.dashboard.push({
					x: 10,
					y: 10,
					cols: 40,
					rows: 40,
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
	}
	exportDashboard() {
		const item = this.dashboardEl.nativeElement.innerHTML;
		this.exportDashboardBus.sendDashboard(item);
	}
}
