import { DraftprojectModule } from './draftproject.module';

describe('DraftprojectModule', () => {
	let draftprojectModule: DraftprojectModule;

	beforeEach(() => {
		draftprojectModule = new DraftprojectModule();
	});

	it('should create an instance', () => {
		expect(draftprojectModule).toBeTruthy();
	});
});
