import { storiesOf, moduleMetadata } from '@storybook/angular';
import '@storybook/addon-notes/register';
import { TabViewModule } from 'primeng/tabview';
import { TabsGroupComponent } from '../app/shared/components/tabs/tabs-group/tabs-group.component';

storiesOf('Tabs', module)
	.addDecorator(
		moduleMetadata({
			imports: [
				TabViewModule
			],
			declarations: []
		})
	)

	.add('Simple tabs', () => ({
		component: TabsGroupComponent,
		props: {
			tabs: [{
				header: 'Open',
				content: '',
				disabled: false
			}, {
				header: 'Done'
			}, {
				header: 'Disabled',
				disabled: true
			}],
			selectedTab: 1,
			change: function() { }
		}
	}))

	.add('Tabs with icons', () => ({
			component: TabsGroupComponent,
			props: {
				tabs: [{
					header: 'Open',
					content: '',
					disabled: false,
					rightIcon: 'fas fa-check'
				}, {
					header: 'Done',
					closable: false,
					rightIcon: 'fas fa-user'
				}, {
					header: 'Disabled',
					closable: false,
					disabled: true,
					rightIcon: 'fas fa-user'
				}],
				selectedTab: 0,
				change: function() { }
			}
		}))

		.add('Closable tab', () => ({
			component: TabsGroupComponent,
			props: {
				tabs: [{
					header: 'Open',
					content: '',
					disabled: false,
					closable: true
				}, {
					header: 'Done',
					closable: true
				}, {
					header: 'Disabled',
					disabled: true,
					closable: true
				}],
				selectedTab: 0,
				change: function() { }
			}
		}));
