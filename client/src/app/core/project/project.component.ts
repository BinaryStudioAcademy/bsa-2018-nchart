import {
	Component,
	OnInit,
	OnDestroy,
	ElementRef,
	QueryList,
	HostListener,
	AfterViewInit,
	ViewChildren
} from '@angular/core';
import { StoreService } from '@app/services/store.service';
import {
	CreateDraftProject,
	LoadOneProject,
	AddedNewPage,
	DiscardFlagNewPage,
	CloseDialog
} from '@app/store/actions/projects/projects.actions';
import { SchemeID } from '@app/models/normalizr.model';
import { isChartsReady } from '@app/store/selectors/charts.selectors';
import {
	projectCharts,
	isProjectLoading,
	isHasNewPage,
	isShowDialog,
	toRedirect
} from '@app/store/selectors/projects.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import * as ProjectsActions from '@app/store/actions/projects/projects.actions';
import { project } from '@app/store/selectors/projects.selectors';
import {
	getActiveChartId,
	getActiveDatasetId,
	hasChartDataset,
	isRequiredDimensionMatched
} from '@app/store/selectors/userCharts';
import { isActiveChartDataset } from '@app/store/selectors/dataset.selectors';
import { CreateChart } from '@app/store/actions/charts/charts.actions';
import { FormGroup } from '@angular/forms';
import { LoginService } from '@app/services/login.service';
import { Login as LoginModel } from '@app/models/login.model';
import { Register as RegisterModel } from '@app/models/register.model';
import {
	CanSaveProject,
	Login as LoginAction,
	Register as RegisterAction
} from '@app/store/actions/user/user.actions';
import { ProjectService } from '@app/services/project.service';
import { RedirectUrl } from '@app/models/redirect.model';
import { ExportSvgBusService } from '@app/services/export-svg-bus.service';

interface StepperStep {
	id: number;
	scrollTo: string;
	name: string;
}

export interface ComponentCanDeactivate {
	canDeactivate: () => boolean | Observable<boolean>;
}

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.sass']
})
export class ProjectComponent implements OnInit, OnDestroy, AfterViewInit {
	showCharts = false;
	showTable = false;
	listPages = [];
	activeChartId: SchemeID;
	isChartsReady = false;
	routeParams$: Subscription;
	subConf = new Subject<boolean>();
	display = false;
	displayModalDataset = false;
	currentDatasetId: SchemeID;
	projectName: string;
	projectId: SchemeID;
	isActiveChartDataset$: Observable<boolean>;
	isLoading: boolean;
	isProjectLoading: boolean;
	displayLoginDialog: boolean;
	loginForm: FormGroup;
	registerForm: FormGroup;
	saveProject: Subscription;
	redirectUrl: RedirectUrl;
	getSvg:Subscription;
	svg : any;

	disconnect: () => void;

	selectedStep: StepperStep;
	viewElements: ElementRef[];
	stepperSteps: StepperStep[];
	stepperErrors = []; // [2, 1];

	@ViewChildren('viewItem', { read: ElementRef })
	viewItems: QueryList<any>;
	viewItemsList: ElementRef[];

	@HostListener('window:scroll', ['$event'])
	onScrollEvent() {
		const scrollPosition = window.pageYOffset;
		for (const i in this.viewItemsList) {
			if (this.viewItemsList[i]) {
				const position =
					this.viewItemsList[i].nativeElement.offsetTop - 340;
				if (scrollPosition >= position) {
					this.selectedStep = this.stepperSteps.find(
						el => el.id === +i + 1
					);
				}
			}
		}
	}

	resetForms() {
		this.loginForm.reset();
		this.registerForm.reset();
	}

	onLogin(loginModel: LoginModel) {
		const user = this.trimStringFields<LoginModel>(loginModel);
		this.storeService.dispatch(new LoginAction({ user }));
	}

	onRegister(registerModel: RegisterModel) {
		const user = this.trimStringFields<RegisterModel>(registerModel);
		this.storeService.dispatch(new RegisterAction({ user }));
	}

	private trimStringFields<T>(obj: T): T {
		return Object.keys(obj).reduce(
			(trimmedObj, key) => {
				const isString = typeof obj[key] === 'string';
				trimmedObj[key] = isString ? obj[key].trim() : obj[key];
				return trimmedObj;
			},
			{} as T
		);
	}
	private createForms() {
		this.loginForm = this.loginService.createLoginForm();
		this.registerForm = this.loginService.createRegisterForm();
	}

	updateViewChildren(): void {
		if (this.viewItemsList) {
			this.viewItemsList = this.viewItems.toArray();			
		}
	}

	isDataset(): boolean {
		this.updateViewChildren();
		return this.showTable;
	}

	isCharts(): boolean {
		this.updateViewChildren();
		return this.showCharts && this.isChartsReady && this.showTable;
	}

	getSteps(data) {
		this.stepperSteps = data;
	}

	ngAfterViewInit() {
		this.viewItemsList = this.viewItems.toArray();
	}

	constructor(
		private storeService: StoreService,
		private route: ActivatedRoute,
		private loginService: LoginService,
		private projectService: ProjectService,
		private router: Router,
		private exportSvgBus: ExportSvgBusService
	) {}

	showDialog() {
		this.display = true;
	}

	accept() {
		this.display = false;
		this.subConf.next(true);
		this.storeService.dispatch(new CloseDialog());
		this.storeService.dispatch(new DiscardFlagNewPage());
		this.router.navigate(
			[this.redirectUrl.url],
			this.redirectUrl.queryParams
		);
	}

	reject() {
		this.display = false;
		this.subConf.next(false);
		this.storeService.dispatch(new CloseDialog());
	}

	acceptDataset() {
		this.displayModalDataset = false;
		this.storeService.dispatch(
			new CreateChart({ datatsetId: this.currentDatasetId })
		);
		this.storeService.dispatch(new AddedNewPage());
	}

	rejectDataset() {
		this.displayModalDataset = false;
		this.storeService.dispatch(new CreateChart({ datatsetId: null }));
		this.storeService.dispatch(new AddedNewPage());
	}

	canDeactivate(): Observable<boolean> {
		this.showDialog();
		return this.subConf;
	}

	ngOnInit() {
		this.displayLoginDialog = false;
		this.createForms();
		this.routeParams$ = this.route.params.subscribe(
			(params: { id?: number }) => {
				const { id } = params;

				if (id) {
					this.storeService.dispatch(
						new LoadOneProject({ projectId: id + '' })
					);
				} else {
					this.storeService.dispatch(new CreateDraftProject());
				}
			}
		);

		this.isActiveChartDataset$ = this.storeService.createSubscription(
			isActiveChartDataset()
		);

		this.disconnect = this.storeService.connect([
			{
				subscriber: prj => {
					if (prj) {
						this.projectId = prj.id;
						this.projectName = prj.name;
					}
				},
				selector: project()
			},
			{
				selector: projectCharts(),
				subscriber: charts => {
					this.listPages = charts;
				}
			},
			{
				selector: getActiveDatasetId(),
				subscriber: id => {
					this.currentDatasetId = id;			
				}
			},
			{
				selector: getActiveChartId(),
				subscriber: id => {
					this.activeChartId = id;			
				}
			},
			{
				selector: hasChartDataset(),
				subscriber: t => {
					this.showTable = t;
				}
			},
			{
				selector: isRequiredDimensionMatched(),
				subscriber: t => {
					this.showCharts = t;
				}
			},
			{
				selector: isChartsReady(),
				subscriber: t => {
					this.isChartsReady = t;
				}
			},
			{
				selector: isProjectLoading(),
				subscriber: t => {
					this.isLoading = t;
					this.isProjectLoading = t && !this.projectId;
				}
			},
			{
				selector: isShowDialog(),
				subscriber: res => {
					if (res) this.display = true;
				}
			},
			{
				selector: toRedirect(),
				subscriber: res => {
					if (res) this.redirectUrl = res;
				}
			}
		]);
		this.getSvg = this.exportSvgBus.responseObservable.subscribe(
			(res : string) => {
			this.svg = res;
		});
		this.saveProject = this.projectService.saveObservable.subscribe(
			(res: boolean) => {
				this.displayLoginDialog = res;
			}
		);
		
	}
	
	requestSvg(){
		setTimeout(() => this.exportSvgBus.requestSvg());	 
	}
	
	ngOnDestroy() {
		this.disconnect();
		this.routeParams$.unsubscribe();
		this.saveProject.unsubscribe();
		this.getSvg.unsubscribe();
	}

	getIsActiveChartDataset() {
		return this.isActiveChartDataset$;
	}

	changeProjectName(name) {
		this.storeService.dispatch(
			new ProjectsActions.ChangeProjectName({
				id: this.projectId,
				name: name
			})
		);
	}

	onDisplayModalDataset() {
		this.displayModalDataset = true;
	}

	saveProj() {
		this.storeService.dispatch(new CanSaveProject());
	}
}
