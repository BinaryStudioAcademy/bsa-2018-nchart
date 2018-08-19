import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from '@app/services/store.service';
import { project } from '@app/store/selectors/projects.selectors';
import { ChangeDetectorRef } from '@angular/core';


@Component({
	selector: 'app-app',
	templateUrl: 'app.component.html',
	styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
	projectName: string;
	getName: () => void;

	constructor(private storeService: StoreService, private cd: ChangeDetectorRef) {}

	ngOnInit() {
		this.getName = this.storeService.connect([
			{
				subscriber: prj => {
					if (prj) {
						this.projectName = prj.name;
					}
				},
				selector: project()
			}
		]);
		this.cd.detectChanges();
	}

	ngOnDestroy() {}
}
