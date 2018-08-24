import { storiesOf, moduleMetadata } from '@storybook/angular';
import '@storybook/addon-notes/register';

import { ButtonModule } from 'primeng/button';
import { ButtonComponent } from '../app/shared/components/button/button/button.component';
import { LoadingSpinnerComponent } from '../app/shared/components/loading-spinner/loading-spinner.component';

storiesOf('Loading spinner', module)
	.addDecorator(
		moduleMetadata({
			imports: [ButtonModule],
			declarations: [ButtonComponent, LoadingSpinnerComponent]
		})
	)
	.add('Small spinner', () => ({
		template: `<div 
                    style=' width:400px; 
                            height:200px;
                            margin: auto; 
                            text-align: center;
                            vertical-align: middle;' 
                    class="ui-main-block" 
                    [loading-sp]="true" [spinnerSize]="'small'"
                    >
                        Small spinner 
                    </div>`,
		props: {}
	}))
	.add('Middle spinner', () => ({
		template: `<div 
                    style=' width:400px; 
                            height:200px;
                            margin: auto; 
                            text-align: center;
                            vertical-align: middle;' 
                    class="ui-main-block" 
                    [loading-sp]="true" [spinnerSize]="'middle'"
                    >
                        Middle spinner 
                    </div>`,
		props: {}
	}))
	.add('Big spinner', () => ({
		template: `<div 
                    style=' width:400px; 
                            height:200px;
                            margin: auto; 
                            text-align: center;
                            vertical-align: middle;' 
                    class="ui-main-block" 
                    [loading-sp]="true" [spinnerSize]="'big'"
                    >
                        Big spinner 
                    </div>`,
		props: {}
	}))
	.add('Spinner with background', () => ({
		template: `<div 
                    style=' width:400px; 
                            height:200px;
                            margin: auto; 
                            text-align: center;
                            vertical-align: middle;' 
                    class="ui-main-block" 
                     [loading-sp]="true" 
                   
                    [backgoundColor]="'#2ff1fe'">
                        Spinner with background
                    </div>`,
		props: {}
	}))
	.add('Spinner with opacity background', () => ({
		template: `<div 
                    style=' width:400px; 
                            height:200px;
                            margin: auto; 
                            text-align: center;
                            vertical-align: middle;' 
                    class="ui-main-block" 
                    [loading-sp]="true" 
                    [backgoundColor]="'#2c2f2fab'">
                        Spinner with opacity background
                    </div>`,
		props: {}
	}))
	.add('Spinner with color', () => ({
		template: `<div 
                    style=' width:400px; 
                            height:200px;
                            margin: auto; 
                            text-align: center;
                            vertical-align: middle;' 
                    class="ui-main-block" 
                    [loading-sp]="true" 
                    [innerSectionColor]="'#fe2f2f75'"
                    [outerSectionColor]="'#fe2f5296'">
                        Spinner with color
                    </div>`,
		props: {}
	}))
	.add('Spinner on secondary button', () => ({
		component: ButtonComponent,
		props: {
			label: 'Secondary',
			size: 'big',
			type: 'default',
			loading: true
		}
	}))

	.add('Spinner on default button', () => ({
		component: ButtonComponent,
		props: {
			label: 'Default Button',
			icon: 'fas fa-check',
			iconPosition: 'right',
			size: 'large',
			type: 'secondary',
			loading: true
		}
	}));
