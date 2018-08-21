import { storiesOf, moduleMetadata } from '@storybook/angular';
import '@storybook/addon-notes/register';

import { LoadingSpinerComponent } from '../app/shared/components/loading-spiner/loading-spiner.component';
import { AngularResizedEventModule } from 'angular-resize-event';

storiesOf('Loading spiner', module)
	.addDecorator(
		moduleMetadata({
			imports: [AngularResizedEventModule],
			declarations: [LoadingSpinerComponent]
		})
	)

	.add('Default spiner', () => ({
		template: `<div 
                    style=' width:400px; 
                            height:200px;
                            margin: auto; 
                            text-align: center;
                            vertical-align: middle;' 
                    class="ui-main-block" 
                    loadingSp [loadingSp]="true" 
                    >
                        Default spiner
                    </div>`,
		props: {}
	}))
	.add('Sized spiner', () => ({
		template: `<div 
                    style=' width:400px; 
                            height:200px;
                            margin: auto; 
                            text-align: center;
                            vertical-align: middle;' 
                    class="ui-main-block" 
                    loadingSp [loadingSp]="true" 
                    [size]="'25%'">
                        Sized spiner 
                    </div>`,
		props: {}
	}))
	.add('Spiner with background', () => ({
		template: `<div 
                    style=' width:400px; 
                            height:200px;
                            margin: auto; 
                            text-align: center;
                            vertical-align: middle;' 
                    class="ui-main-block" 
                    loadingSp [loadingSp]="true" 
                    [size]="'50%'"
                    [backgoundColor]="'#2ff1fe'">
                        Spiner with background
                    </div>`,
		props: {}
	}))
	.add('Spiner with opactity baground', () => ({
		template: `<div 
                    style=' width:400px; 
                            height:200px;
                            margin: auto; 
                            text-align: center;
                            vertical-align: middle;' 
                    class="ui-main-block" 
                    loadingSp [loadingSp]="true" 
                    [size]="'50%'"
                    [backgoundColor]="'#2c2f2fab'">
                        Spiner with opactity baground
                    </div>`,
		props: {}
	}))
	.add('Spiner with color', () => ({
		template: `<div 
                    style=' width:400px; 
                            height:200px;
                            margin: auto; 
                            text-align: center;
                            vertical-align: middle;' 
                    class="ui-main-block" 
                    loadingSp [loadingSp]="true" 
                    [size]="'50%'"
                    [innerSectionColor]="'#fe2f2f75'"
                    [outerSectionColor]="'#fe2f5296'">
                        Spiner with color
                    </div>`,
		props: {}
	}));
