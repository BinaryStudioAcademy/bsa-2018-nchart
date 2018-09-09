import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as projectActions from 'app/store/actions/projects/projects.actions';
import { StoreService } from 'app/services/store.service';

@Component({
	selector: 'app-delete-dialog',
	templateUrl: './delete-dialog.component.html'
})
export class DeleteDialogComponent implements OnInit {
	constructor(private storeService: StoreService) {}

	@Input()
	displayDelete: boolean;
	@Output()
	displayDeleteChange = new EventEmitter<boolean>();

	@Input()
	projectId: number;

	@Input()
	accessLevelId: number;

	close() {
		this.displayDeleteChange.emit(false);
	}

	ngOnInit() {}

	delete() {
		this.storeService.dispatch(
			new projectActions.DeleteOneProject({
				projectId: this.projectId,
				accessLevelId: this.accessLevelId
			})
		);
		this.displayDeleteChange.emit(false);
	}
}
