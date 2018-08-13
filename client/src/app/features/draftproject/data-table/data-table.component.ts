import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-data-table',
	templateUrl: './data-table.component.html',
	styleUrls: ['./data-table.component.sass']
})
export class DataTableComponent implements OnInit {
	items = [
		{
			id: '586a4e5739245788fb06db81',
			index: 5,
			age: 37,
			name: 'Vaughan Hickman',
			gender: 'male',
			company: 'PYRAMAX',
			email: 'vaughanhickman@pyramax.com',
			phone: '+1 (829) 416-2143',
			address: '338 Dorchester Road, Connerton, Oregon, 8528'
		},
		{
			id: '586a4e57cafe65c26139d877',
			index: 6,
			age: 30,
			name: 'Day Ingram',
			gender: 'male',
			company: 'SARASONIC',
			email: 'dayingram@sarasonic.com',
			phone: '+1 (970) 516-2029',
			address: '888 Duryea Place, Homestead, New York, 8692'
		},
		{
			id: '586a4e573c6cdd1509c09088',
			index: 7,
			age: 21,
			name: 'Lou Burt',
			gender: 'female',
			company: 'RECOGNIA',
			email: 'louburt@recognia.com',
			phone: '+1 (920) 595-3983',
			address: '583 Carlton Avenue, Sunbury, North Dakota, 1916'
		},
		{
			id: '586a4e5790ba46be4d2e8311',
			index: 8,
			age: 37,
			name: 'Julia Potter',
			gender: 'female',
			company: 'SPORTAN',
			email: 'juliapotter@sportan.com',
			phone: '+1 (944) 508-3586',
			address: '185 Green Street, Calpine, Nevada, 1523'
		},
		{
			id: '586a4e57deea028cffb05cf8',
			index: 9,
			age: 39,
			name: 'Eva Rivas',
			gender: 'female',
			company: 'PLASMOS',
			email: 'evarivas@plasmos.com',
			phone: '+1 (916) 597-2893',
			address: '114 Kossuth Place, Bath, Wisconsin, 3844'
		},
		{
			id: '586a4e5763c981421c48b9c4',
			index: 10,
			age: 34,
			name: 'Orr Crawford',
			gender: 'male',
			company: 'RADIANTIX',
			email: 'orrcrawford@radiantix.com',
			phone: '+1 (929) 591-2656',
			address: '616 Lake Avenue, Dahlen, Virginia, 1229'
		},
		{
			id: '586a4e57d7fba91c486bb266',
			index: 11,
			age: 22,
			name: 'Irene Greer',
			gender: 'female',
			company: 'ELEMANTRA',
			email: 'irenegreer@elemantra.com',
			phone: '+1 (963) 532-2046',
			address: '411 Wolf Place, Manila, Arkansas, 8507'
		},
		{
			id: '586a4e570b8456c665a2be3a',
			index: 12,
			age: 35,
			name: 'Wilder Schmidt',
			gender: 'male',
			company: 'UNDERTAP',
			email: 'wilderschmidt@undertap.com',
			phone: '+1 (805) 528-2376',
			address: '680 Bedford Avenue, Gibbsville, Texas, 9304'
		},
		{
			id: '586a4e57625cf4b3b5368a18',
			index: 13,
			age: 34,
			name: 'Lara Pollard',
			gender: 'male',
			company: 'SLUMBERIA',
			email: 'larapollard@slumberia.com',
			phone: '+1 (984) 492-3959',
			address: '934 Troy Avenue, Jacksonburg, Georgia, 5286'
		},
		{
			id: '586a4e5711b8c8053d641bd7',
			index: 14,
			age: 26,
			name: 'Carlson Hancock',
			gender: 'male',
			company: 'CENTICE',
			email: 'carlsonhancock@centice.com',
			phone: '+1 (946) 504-2695',
			address: '785 Glenwood Road, Smock, American Samoa, 1799'
		},
		{
			id: '586a4e578719399e45af6438',
			index: 15,
			age: 34,
			name: 'Perkins Black',
			gender: 'male',
			company: 'DAIDO',
			email: 'perkinsblack@daido.com',
			phone: '+1 (837) 488-3975',
			address: '270 Poly Place, Choctaw, Kentucky, 2895'
		},
		{
			id: '586a4e575f09792e2a421cba',
			index: 16,
			age: 28,
			name: 'Arlene Ochoa',
			gender: 'female',
			company: 'TERRASYS',
			email: 'arleneochoa@terrasys.com',
			phone: '+1 (970) 449-2000',
			address: '977 Cedar Street, Martinez, Puerto Rico, 4442'
		},
		{
			id: '586a4e570401a6113b83b785',
			index: 17,
			age: 34,
			name: 'Karin Herring',
			gender: 'female',
			company: 'KNOWLYSIS',
			email: 'karinherring@knowlysis.com',
			phone: '+1 (918) 509-3451',
			address: '893 Elm Avenue, Dale, Alabama, 451'
		},
		{
			id: '586a4e57d6288e71d4e6692f',
			index: 18,
			age: 38,
			name: 'Cherry Benjamin',
			gender: 'male',
			company: 'LIQUICOM',
			email: 'cherrybenjamin@liquicom.com',
			phone: '+1 (957) 539-3539',
			address: '906 Throop Avenue, Baker, Minnesota, 2118'
		},
		{
			id: '586a4e57921dc7f4d461972b',
			index: 19,
			age: 37,
			name: 'Mills Gonzales',
			gender: 'male',
			company: 'MARKETOID',
			email: 'millsgonzales@marketoid.com',
			phone: '+1 (991) 539-2425',
			address: '603 Bleecker Street, Umapine, Alaska, 7152'
		},
		{
			id: '586a4e57118007c1a254fa1e',
			index: 20,
			age: 24,
			name: 'Cortez Stevenson',
			gender: 'male',
			company: 'CENTREE',
			email: 'cortezstevenson@centree.com',
			phone: '+1 (876) 566-2999',
			address: '284 Chester Court, Dawn, Nebraska, 719'
		},
		{
			id: '586a4e57d47d32e03eddf893',
			index: 21,
			age: 30,
			name: 'Ofelia Moody',
			gender: 'female',
			company: 'XYLAR',
			email: 'ofeliamoody@xylar.com',
			phone: '+1 (976) 426-2339',
			address: '882 Banner Avenue, Jeff, Virgin Islands, 6218'
		},
		{
			id: '586a4e57a14e68f09834ca10',
			index: 22,
			age: 38,
			name: 'Gates Michael',
			gender: 'male',
			company: 'ZILPHUR',
			email: 'gatesmichael@zilphur.com',
			phone: '+1 (911) 506-2497',
			address: '432 Milford Street, Croom, Michigan, 3560'
		},
		{
			id: '586a4e57e0c4711fa9a775ee',
			index: 23,
			age: 27,
			name: 'Concepcion Marsh',
			gender: 'female',
			company: 'ENTHAZE',
			email: 'concepcionmarsh@enthaze.com',
			phone: '+1 (816) 565-3686',
			address: '661 Hutchinson Court, Greenwich, Rhode Island, 4904'
		},
		{
			id: '586a4e5760c722564d8929b0',
			index: 24,
			age: 34,
			name: 'Gamble Bauer',
			gender: 'male',
			company: 'ZBOO',
			email: 'gamblebauer@zboo.com',
			phone: '+1 (924) 436-2014',
			address: '746 Truxton Street, Noblestown, New Mexico, 5495'
		},
		{
			id: '586a4e57dc616d0677371dc5',
			index: 25,
			age: 28,
			name: 'Hendrix Atkins',
			gender: 'male',
			company: 'HELIXO',
			email: 'hendrixatkins@helixo.com',
			phone: '+1 (809) 463-2784',
			address: '393 Grove Place, Madaket, South Dakota, 3484'
		},
		{
			id: '586a4e57aaa5027e750c0822',
			index: 26,
			age: 31,
			name: 'Mays Osborne',
			gender: 'male',
			company: 'ATOMICA',
			email: 'maysosborne@atomica.com',
			phone: '+1 (965) 586-3215',
			address: '660 Woodhull Street, Clarksburg, Delaware, 9774'
		},
		{
			id: '586a4e57bbda8cccb6ea29cd',
			index: 27,
			age: 22,
			name: 'Norris Henderson',
			gender: 'male',
			company: 'XEREX',
			email: 'norrishenderson@xerex.com',
			phone: '+1 (837) 520-3269',
			address: '750 Lott Place, Cherokee, West Virginia, 9408'
		},
		{
			id: '586a4e5721f2123a19394370',
			index: 28,
			age: 38,
			name: 'Cruz Goodman',
			gender: 'male',
			company: 'VIRVA',
			email: 'cruzgoodman@virva.com',
			phone: '+1 (824) 443-3233',
			address: '397 Stryker Court, Salunga, Pennsylvania, 858'
		},
		{
			id: '586a4e57a05044275e4aca25',
			index: 29,
			age: 28,
			name: 'Mavis Roy',
			gender: 'female',
			company: 'EMTRAC',
			email: 'mavisroy@emtrac.com',
			phone: '+1 (937) 447-2916',
			address: '112 Clermont Avenue, Kenwood, Mississippi, 2643'
		},
		{
			id: '586a4e57a38025819b1a788b',
			index: 30,
			age: 27,
			name: 'Hensley Mcknight',
			gender: 'male',
			company: 'XELEGYL',
			email: 'hensleymcknight@xelegyl.com',
			phone: '+1 (869) 540-3291',
			address: '815 Putnam Avenue, Eagletown, Iowa, 4704'
		},
		{
			id: '586a4e57391440a423da07d7',
			index: 31,
			age: 31,
			name: 'Long Cox',
			gender: 'male',
			company: 'GREEKER',
			email: 'longcox@greeker.com',
			phone: '+1 (964) 540-2311',
			address: '504 Boerum Place, Farmers, Massachusetts, 1707'
		}
	];
	constructor() {}

	ngOnInit() {}
}
