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
import { InputTextareaComponent } from '@app/shared/components/form-field/input-textarea/input-textarea.component';
import { FormControl } from '@angular/forms';
import { InputTextComponent } from '@app/shared/components/form-field/input-text/input-text.component';
import { control } from 'stories/tooltip.stories';
import { items } from 'stories/input.stories';
import { DashboardTextblockComponent } from './dashboard.components/dashboard-textblock/dashboard-textblock.component';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
	displayModalDashboard = false;//true;
	options: GridsterConfig;
	dashboard: Array<GridsterItem> = [];
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
	landscape : boolean = true;
	textControll : FormControl = new FormControl('');

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
				minCols: 55,
				maxCols: 55,
				minRows: 39,
				maxRows: 39,
				margin: 0,
				fixedColWidth:20,
				fixedRowHeight: 20
				// gridType: GridType.Fixed,
				// displayGrid: DisplayGrid.Always,
				// pushItems: true,
				// draggable: {
				// 	enabled: true
				// },
				// resizable: {
				// 	enabled: false
				// },
				// minCols: 31,
				// maxCols: 31,
				// minRows: 60,
				// maxRows: 60,
				// // maxItemCols: 77,
				// // minItemCols: 10,
				// // maxItemRows: 99,
				// // minItemRows: 10,
				// // maxItemArea: 6930,
				// // minItemArea: 100,
				// // defaultItemCols: 12,
				// // defaultItemRows: 12,
				// margin: 0,
				// fixedColWidth:20,
				// fixedRowHeight: 20
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
				minCols: 35,
				maxCols: 35,
				minRows: 20,
				maxRows: 20,
				// maxItemCols: 99,
				// minItemCols: 10,
				// maxItemRows: 77,
				// minItemRows: 10,
				// maxItemArea: 6930,
				// minItemArea: 100,
				// defaultItemCols: 12,
				// defaultItemRows: 12,
				margin: 0,
				fixedColWidth: 20,
				fixedRowHeight: 20
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

		// this.options = {};
		// this.options = {
		// 	width: 'auto',
		// 	gridType: GridType.Fit,
		// 	displayGrid: DisplayGrid.Always,
		// 	pushItems: true,
		// 	draggable: {
		// 		enabled: true
		// 	},
		// 	resizable: {
		// 		enabled: false
		// 	},
		// 	minCols: 61,
		// 	maxCols: 61,
		// 	minRows: 30,
		// 	maxRows: 70,
		// 	maxItemCols: 99,
		// 	minItemCols: 10,
		// 	maxItemRows: 77,
		// 	minItemRows: 10,
		// 	maxItemArea: 6930,
		// 	minItemArea: 100,
		// 	defaultItemCols: 12,
		// 	defaultItemRows: 12,
		// 	margin: 0,
		// 	fixedColWidth: 10,
		// 	fixedRowHeight: 10
		// };

		this.options = {
			gridType: GridType.Fixed,
			displayGrid: DisplayGrid.Always,
			pushItems: true,
			draggable: {
				enabled: true
			},
			resizable: {
				enabled: true,
				handles : {s: false, e: true, n: false, w: true, se: true, ne:true, sw: true, nw: true}
			},
			minCols: 55,
			maxCols: 55,
			minRows: 39,
			maxRows: 39,
			// maxItemCols: 77,
			// minItemCols: 10,
			// maxItemRows: 99,
			// minItemRows: 10,
			// maxItemArea: 6930,
			// minItemArea: 100,
			// defaultItemCols: 12,
			// defaultItemRows: 12,
			margin: 0,
			fixedColWidth:20,
			fixedRowHeight: 20
		};

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
						landscape : !this.horizontalLayout,
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

				if(componentRef.instance instanceof InputTextareaComponent){
					const instance: InputTextareaComponent = componentRef.instance as InputTextareaComponent;

					instance.control = item.data.inputs.control;
					instance.label = item.data.inputs.label;
				}

				if(componentRef.instance instanceof DashboardTextblockComponent){
					const instance: DashboardTextblockComponent = componentRef.instance as DashboardTextblockComponent;

					instance.text = item.data.inputs.text;

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
		debugger;
		
		const chartId = chart.userChartsId[0];

		this.storeService
			.createSubscription(getCustomizeSettings(chartId))
			.pipe(
				withLatestFrom(
					this.storeService.createSubscription(getData(chartId))
				),
				take(1)
			)
			.subscribe(([customizeSettings, data]) => {
				customizeSettings.width.value = 600;
				customizeSettings.height.value = 350;
				let dataFormated;
				const item = {
					x: 0,
					y: 0,
					cols: 15,
					rows: 15,
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
					x: 0,
					y: 0,
					cols: 30,
					rows: 21,
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
			this.userCharts = this.userCharts.filter(x => x !== chart);
	}
	exportDashboard() {
		let item : string = this.dashboardEl.el.innerHTML;
		this.exportDashboardBus.sendDashboard(item);
	}
	
	addTextBlock(){
		let str = this.textControll.value;
		this.dashboard.push({
			x: 0,
			y: 0,
			cols: 15,
			rows: 5,
			data: {
				component: DashboardTextblockComponent,
				inputs : {
					text : str
				}				
			}
		});
	}
}
