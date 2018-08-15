import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-data-table',
	templateUrl: './data-table.component.html',
	styleUrls: ['./data-table.component.sass']
})
export class DataTableComponent implements OnInit {
	payload = {
		columns: [
			{ title: 'id', type: 'string' },
			{ title: 'age', type: 'number' },
			{ title: 'name', type: 'string' },
			{ title: 'email', type: 'string' }
		],
		data: [
			[
				'586a4e571a1b9a45d337f7ec',
				33,
				'Wyatt Meadows',
				'wyattmeadows@elentrix.com'
			],
			[
				'586a4e5731b8f13d8dc689c6',
				33,
				'April Benton',
				'aprilbenton@krag.com'
			],
			[
				'586a4e571a1b9a45d337f7ec',
				33,
				'Wyatt Meadows',
				'wyattmeadows@elentrix.com'
			],
			[
				'586a4e5731b8f13d8dc689c6',
				33,
				'April Benton',
				'aprilbenton@krag.com'
			],
			[
				'586a4e571a1b9a45d337f7ec',
				33,
				'Wyatt Meadows',
				'wyattmeadows@elentrix.com'
			],
			[
				'586a4e5731b8f13d8dc689c6',
				33,
				'April Benton',
				'aprilbenton@krag.com'
			],
			[
				'586a4e571a1b9a45d337f7ec',
				33,
				'Wyatt Meadows',
				'wyattmeadows@elentrix.com'
			],
			[
				'586a4e5731b8f13d8dc689c6',
				33,
				'April Benton',
				'aprilbenton@krag.com'
			],
			[
				'586a4e571a1b9a45d337f7ec',
				33,
				'Wyatt Meadows',
				'wyattmeadows@elentrix.com'
			],
			[
				'586a4e5731b8f13d8dc689c6',
				33,
				'April Benton',
				'aprilbenton@krag.com'
			],
			[
				'586a4e571a1b9a45d337f7ec',
				33,
				'Wyatt Meadows',
				'wyattmeadows@elentrix.com'
			],
			[
				'586a4e5731b8f13d8dc689c6',
				33,
				'April Benton',
				'aprilbenton@krag.com'
			],
			[
				'586a4e571a1b9a45d337f7ec',
				33,
				'Wyatt Meadows',
				'wyattmeadows@elentrix.com'
			],
			[
				'586a4e5731b8f13d8dc689c6',
				33,
				'April Benton',
				'aprilbenton@krag.com'
			],
			[
				'586a4e571a1b9a45d337f7ec',
				33,
				'Wyatt Meadows',
				'wyattmeadows@elentrix.com'
			],
			[
				'586a4e5731b8f13d8dc689c6',
				33,
				'April Benton',
				'aprilbenton@krag.com'
			],
			[
				'586a4e571a1b9a45d337f7ec',
				33,
				'Wyatt Meadows',
				'wyattmeadows@elentrix.com'
			],
			[
				'586a4e5731b8f13d8dc689c6',
				33,
				'April Benton',
				'aprilbenton@krag.com'
			],
			[
				'586a4e571a1b9a45d337f7ec',
				33,
				'Wyatt Meadows',
				'wyattmeadows@elentrix.com'
			],
			[
				'586a4e5731b8f13d8dc689c6',
				33,
				'April Benton',
				'aprilbenton@krag.com'
			],
			[
				'586a4e571a1b9a45d337f7ec',
				33,
				'Wyatt Meadows',
				'wyattmeadows@elentrix.com'
			],
			[
				'586a4e5731b8f13d8dc689c6',
				33,
				'April Benton',
				'aprilbenton@krag.com'
			],
			[
				'586a4e571a1b9a45d337f7ec',
				33,
				'Wyatt Meadows',
				'wyattmeadows@elentrix.com'
			],
			[
				'586a4e5731b8f13d8dc689c6',
				33,
				'April Benton',
				'aprilbenton@krag.com'
			],
			[
				'586a4e571a1b9a45d337f7ec',
				33,
				'Wyatt Meadows',
				'wyattmeadows@elentrix.com'
			],
			[
				'586a4e5731b8f13d8dc689c6',
				33,
				'April Benton',
				'aprilbenton@krag.com'
			],
			[
				'586a4e571a1b9a45d337f7ec',
				33,
				'Wyatt Meadows',
				'wyattmeadows@elentrix.com'
			],
			[
				'586a4e5731b8f13d8dc689c6',
				33,
				'April Benton',
				'aprilbenton@krag.com'
			],
			[
				'586a4e571a1b9a45d337f7ec',
				33,
				'Wyatt Meadows',
				'wyattmeadows@elentrix.com'
			],
			[
				'586a4e5731b8f13d8dc689c6',
				33,
				'April Benton',
				'aprilbenton@krag.com'
			],
			[
				'586a4e571a1b9a45d337f7ec',
				33,
				'Wyatt Meadows',
				'wyattmeadows@elentrix.com'
			],
			[
				'586a4e5731b8f13d8dc689c6',
				33,
				'April Benton',
				'aprilbenton@krag.com'
			],
			[
				'586a4e571a1b9a45d337f7ec',
				33,
				'Wyatt Meadows',
				'wyattmeadows@elentrix.com'
			],
			[
				'586a4e5731b8f13d8dc689c6',
				33,
				'April Benton',
				'aprilbenton@krag.com'
			],
			[
				'586a4e571a1b9a45d337f7ec',
				33,
				'Wyatt Meadows',
				'wyattmeadows@elentrix.com'
			],
			[
				'586a4e5731b8f13d8dc689c6',
				33,
				'April Benton',
				'aprilbenton@krag.com'
			],
			[
				'586a4e571a1b9a45d337f7ec',
				33,
				'Wyatt Meadows',
				'wyattmeadows@elentrix.com'
			],
			[
				'586a4e5731b8f13d8dc689c6',
				33,
				'April Benton',
				'aprilbenton@krag.com'
			],
			[
				'586a4e571a1b9a45d337f7ec',
				33,
				'Wyatt Meadows',
				'wyattmeadows@elentrix.com'
			],
			[
				'586a4e5731b8f13d8dc689c6',
				33,
				'April Benton',
				'aprilbenton@krag.com'
			],
			[
				'586a4e571a1b9a45d337f7ec',
				33,
				'Wyatt Meadows',
				'wyattmeadows@elentrix.com'
			],
			[
				'586a4e5731b8f13d8dc689c6',
				33,
				'April Benton',
				'aprilbenton@krag.com'
			]
		]
	};
	constructor() {}

	ngOnInit() {}
}
