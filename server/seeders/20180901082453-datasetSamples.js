const v4 = require('uuid');

module.exports = {
	up: queryInterface => queryInterface.bulkInsert(
		'datasets',
		[
			{
				id: v4.v4(),
				columns: JSON.stringify([
					{ title: 'Rank', type: 'number', id: v4.v4() },
					{ title: 'Name', type: 'string', id: v4.v4() },
					{
						title: 'Population 1991',
						type: 'number',
						id: v4.v4()
					},
					{
						title: 'Population 2001',
						type: 'number',
						id: v4.v4()
					},
					{
						title: 'Population 2007',
						type: 'number',
						id: v4.v4()
					},
					{ title: 'State', type: 'string', id: v4.v4() }
				]),
				data: JSON.stringify([
					[
						68,
						'Brunn am Gebirge',
						8573,
						9422,
						10579,
						'Lower Austria'
					],
					[26, 'Hallein', 17271, 18399, 19169, 'Salzburg'],
					[47, 'Hall in Tirol', 12368, 11492, 12424, 'Tyrol'],
					[10, 'Dornbirn', 40735, 42301, 44243, 'Vorarlberg'],
					[19, 'Traun', 22260, 23470, 23941, 'Upper Austria'],
					[6, 'Klagenfurt', 89415, 90141, 92397, 'Carinthia'],
					[57, 'Waidhofen', 11435, 11662, 11671, 'Lower Austria'],
					[15, 'Wolfsberg', 24400, 25335, 25361, 'Carinthia'],
					[23, 'Kapfenberg', 23380, 22234, 21928, 'Styria'],
					[53, 'Knittelfeld', 12873, 12740, 11991, 'Styria'],
					[39, 'Feldkirchen', 12977, 14030, 14298, 'Carinthia'],
					[
						9,
						'Sankt Pölten',
						50026,
						49121,
						51360,
						'Lower Austria'
					],
					[38, 'Telfs', 10179, 12833, 14443, 'Tyrol'],
					[32, 'Saalfelden', 12604, 15093, 15728, 'Salzburg'],
					[13, 'Feldkirch', 26730, 28607, 30093, 'Vorarlberg'],
					[21, 'Leonding', 21209, 22203, 23624, 'Upper Austria'],
					[
						55,
						'Marchtrenk',
						10369,
						11274,
						11743,
						'Upper Austria'
					],
					[8, 'Villach', 54640, 57497, 58480, 'Carinthia'],
					[65, 'Enns', 10192, 10611, 11139, 'Upper Austria'],
					[43, 'Bruck an der Mur', 14046, 13439, 13304, 'Styria'],
					[35, 'Ternitz', 15445, 15232, 15066, 'Lower Austria'],
					[
						49,
						'Neunkirchen',
						10216,
						11562,
						12148,
						'Lower Austria'
					],
					[
						16,
						'Baden bei Wien',
						23488,
						24502,
						25284,
						'Lower Austria'
					],
					[
						54,
						'Vöcklabruck',
						11239,
						11697,
						11945,
						'Upper Austria'
					],
					[58, 'Rankweil', 10509, 11171, 11627, 'Vorarlberg'],
					[
						31,
						'Spittal an der Drau',
						15346,
						16045,
						15944,
						'Carinthia'
					],
					[48, 'Eisenstadt', 10349, 11334, 12367, 'Burgenland'],
					[
						45,
						'Sankt Veit an der Glan',
						12045,
						12976,
						12994,
						'Carinthia'
					],
					[25, 'Lustenau', 18484, 19709, 20606, 'Vorarlberg'],
					[42, 'Bludenz', 13369, 13701, 13890, 'Vorarlberg'],
					[
						20,
						'Krems an der Donau',
						22766,
						23713,
						23932,
						'Lower Austria'
					],
					[
						27,
						'Traiskirchen',
						13852,
						15669,
						16497,
						'Lower Austria'
					],
					[44, 'Gmunden', 13133, 13184, 13191, 'Upper Austria'],
					[4, 'Salzburg', 143978, 142662, 149018, 'Salzburg'],
					[36, 'Hohenems', 13531, 13891, 14864, 'Vorarlberg'],
					[52, 'Wörgl', 10054, 10885, 11993, 'Tyrol'],
					[
						64,
						'Hollabrunn',
						10461,
						10685,
						11199,
						'Lower Austria'
					],
					[
						67,
						'Sankt Johann im Pongau',
						8855,
						10260,
						10682,
						'Salzburg'
					],
					[
						63,
						'Bad Vöslau',
						11055,
						10998,
						11218,
						'Lower Austria'
					],
					[30, 'Schwechat', 14669, 15286, 16065, 'Lower Austria'],
					[
						18,
						'Klosterneuburg',
						24442,
						24797,
						25216,
						'Lower Austria'
					],
					[
						66,
						'Mistelbach',
						10234,
						10644,
						11040,
						'Lower Austria'
					],
					[
						29,
						'Braunau am Inn',
						16264,
						16337,
						16328,
						'Upper Austria'
					],
					[
						59,
						'Ried im Innkreis',
						11260,
						11404,
						11585,
						'Upper Austria'
					],
					[22, 'Amstetten', 21972, 22595, 23035, 'Lower Austria'],
					[17, 'Leoben', 28897, 25804, 25227, 'Styria'],
					[
						37,
						'Perchtoldsdorf',
						14051,
						13998,
						14489,
						'Lower Austria'
					],
					[
						11,
						'Wiener Neustadt',
						35134,
						37627,
						39940,
						'Lower Austria'
					]
				]),
				name: 'List Of Cities And Towns In Austria',
				sample: true,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				id: v4.v4(),
				columns: JSON.stringify([
					{ title: 'state', type: 'string', id: v4.v4() },
					{ title: 'numcol', type: 'number', id: v4.v4() },
					{ title: 'yieldpercol', type: 'number', id: v4.v4() },
					{ title: 'totalprod', type: 'number', id: v4.v4() },
					{ title: 'stocks', type: 'number', id: v4.v4() },
					{ title: 'priceperlb', type: 'number', id: v4.v4() },
					{ title: 'prodvalue', type: 'number', id: v4.v4() },
					{ title: 'year', type: 'number', id: v4.v4() }
				]),
				data: JSON.stringify([
					[
						'LA',
						41000,
						111,
						4551000,
						865000,
						0.59,
						2685000,
						1998
					],
					['ME', 10000, 26, 260000, 117000, 0.69, 179000, 1998],
					['MD', 7000, 44, 308000, 92000, 1.1, 339000, 1998],
					[
						'MI',
						80000,
						85,
						6800000,
						3672000,
						0.66,
						4488000,
						1998
					],
					['KS', 15000, 68, 1020000, 520000, 0.91, 928000, 2000],
					['KY', 4000, 48, 192000, 54000, 1.35, 259000, 2000],
					[
						'LA',
						43000,
						94,
						4042000,
						1334000,
						0.52,
						2102000,
						2000
					],
					['ME', 11000, 21, 231000, 143000, 0.75, 173000, 2000],
					['MD', 6000, 46, 276000, 52000, 1.14, 315000, 2000],
					['MI', 72000, 75, 5400000, 2970000, 0.6, 3240000, 2000],
					[
						'MN',
						150000,
						90,
						13500000,
						3105000,
						0.57,
						7695000,
						2000
					],
					['MS', 17000, 72, 1224000, 649000, 0.69, 845000, 2000],
					['MO', 23000, 75, 1725000, 362000, 0.6, 1035000, 2000],
					[
						'MT',
						124000,
						88,
						10912000,
						4692000,
						0.59,
						6438000,
						2000
					],

					[
						'NY',
						58000,
						80,
						4640000,
						2274000,
						0.55,
						2552000,
						2000
					],
					['NC', 11000, 49, 539000, 243000, 1.43, 771000, 2000],
					[
						'ND',
						300000,
						115,
						34500000,
						13800000,
						0.57,
						19665000,
						2000
					],
					['OH', 18000, 65, 1170000, 585000, 0.79, 924000, 2000],
					['OK', 7000, 35, 245000, 64000, 1.26, 309000, 2000],
					[
						'OR',
						48000,
						51,
						2448000,
						1665000,
						0.66,
						1616000,
						2000
					],
					['PA', 25000, 45, 1125000, 630000, 0.76, 855000, 2000],
					[
						'SD',
						235000,
						121,
						28435000,
						12796000,
						0.58,
						16492000,
						2000
					],
					['TN', 9000, 61, 549000, 104000, 1.43, 785000, 2000],
					[
						'TX',
						105000,
						79,
						8295000,
						2986000,
						0.57,
						4728000,
						2000
					],
					[
						'WA',
						52000,
						54,
						2808000,
						1151000,
						0.58,
						1629000,
						2000
					],
					['WV', 7000, 54, 378000, 234000, 1.22, 461000, 2000],
					[
						'WI',
						84000,
						90,
						7560000,
						4385000,
						0.68,
						5141000,
						2000
					],
					['WY', 39000, 93, 3627000, 798000, 0.59, 2140000, 2000],
					['AL', 14000, 73, 1022000, 235000, 0.72, 736000, 2001],
					[
						'AZ',
						43000,
						59,
						2537000,
						1142000,
						0.72,
						1827000,
						2001
					],
					[
						'AR',
						50000,
						98,
						4900000,
						1617000,
						0.65,
						3185000,
						2001
					],
					[
						'CA',
						460000,
						61,
						28060000,
						7857000,
						0.69,
						19361000,
						2001
					],
					['CO', 26000, 55, 1430000, 529000, 0.71, 1015000, 2001],
					[
						'FL',
						220000,
						100,
						22000000,
						3432000,
						0.64,
						14080000,
						2001
					],
					['GA', 55000, 57, 3135000, 188000, 0.7, 2195000, 2001],
					['HI', 8000, 87, 696000, 84000, 0.87, 606000, 2001],
					[
						'ID',
						100000,
						46,
						4600000,
						1610000,
						0.67,
						3082000,
						2001
					],
					[
						'MI',
						76000,
						60,
						4560000,
						2827000,
						0.81,
						3694000,
						2001
					],
					[
						'MN',
						135000,
						81,
						10935000,
						1859000,
						0.65,
						7108000,
						2001
					],

					[
						'NY',
						53000,
						70,
						3710000,
						1781000,
						0.79,
						2931000,
						2001
					],
					['NC', 13000, 44, 57, 17, 1.48, 847000, 2001],
					[
						'ND',
						280000,
						96,
						26880000,
						9408000,
						0.69,
						18547000,
						2001
					],
					[
						'SD',
						235000,
						65,
						15275000,
						12220000,
						0.71,
						10845000,
						2001
					],
					['TN', 8000, 59, 472000, 131000, 1.39, 656000, 2001],
					[
						'TX',
						97000,
						79,
						7663000,
						1533000,
						0.65,
						4981000,
						2001
					],
					['CO', 24000, 60, 1440000, 576000, 1.29, 1858000, 2002],
					[
						'FL',
						220000,
						93,
						20460000,
						2026000,
						1.14,
						23324000,
						2002
					],
					['GA', 50000, 52, 2600000, 52000, 1.13, 2938000, 2002],
					['HI', 7000, 136, 952000, 29000, 1.11, 1057000, 2002],
					[
						'ID',
						100000,
						57,
						5700000,
						1653000,
						1.37,
						7809000,
						2002
					],
					['KY', 5000, 54, 270000, 78000, 1.63, 440000, 2002],
					[
						'LA',
						35000,
						124,
						4340000,
						347000,
						1.16,
						5034000,
						2002
					],
					['ME', 11000, 41, 451000, 266000, 1.21, 546000, 2002],
					['MD', 3000, 46, 138000, 21000, 1.96, 270000, 2002],
					['MI', 72000, 77, 5544000, 1885000, 1.4, 7762000, 2002],
					[
						'MN',
						117000,
						73,
						8541000,
						1110000,
						1.47,
						12555000,
						2002
					],
					['MS', 18000, 78, 1404000, 281000, 1.23, 1727000, 2002],
					['MO', 18000, 50, 900000, 189000, 1.42, 1278000, 2002],
					[
						'MT',
						134000,
						63,
						8442000,
						1097000,
						1.38,
						11650000,
						2002
					],
					[
						'NE',
						43000,
						75,
						3225000,
						1161000,
						1.49,
						4805000,
						2002
					],
					[
						'NY',
						60000,
						98,
						5880000,
						2470000,
						1.25,
						7350000,
						2002
					],
					['NC', 16000, 42, 672000, 74000, 1.41, 948000, 2002],
					[
						'ND',
						320000,
						75,
						24000000,
						8160000,
						1.46,
						35040000,
						2002
					],
					[
						'SD',
						225000,
						51,
						11475000,
						2410000,
						1.42,
						16295000,
						2002
					],
					['TN', 8000, 61, 488000, 137000, 1.4, 683000, 2002],
					[
						'TX',
						114000,
						67,
						7638000,
						985000,
						1.14,
						8707000,
						2002
					],
					[
						'WI',
						70000,
						95,
						6650000,
						2461000,
						1.34,
						8911000,
						2002
					],
					[
						'CA',
						480000,
						67,
						32160000,
						6432000,
						1.39,
						44702000,
						2003
					],
					['CO', 24000, 86, 2064000, 722000, 1.4, 2890000, 2003],
					[
						'FL',
						210000,
						71,
						14910000,
						1491000,
						1.32,
						19681000,
						2003
					],
					['GA', 52000, 65, 3380000, 270000, 1.28, 4326000, 2003],
					['HI', 7000, 114, 798000, 43000, 1.45, 1157000, 2003],
					[
						'ID',
						100000,
						46,
						4600000,
						1380000,
						1.33,
						6118000,
						2003
					],
					[
						'MI',
						65000,
						74,
						4810000,
						1732000,
						1.41,
						6782000,
						2003
					],
					[
						'MN',
						120000,
						83,
						9960000,
						1892000,
						1.44,
						14342000,
						2003
					],
					['MS', 21000, 69, 1449000, 246000, 1.29, 1869000, 2003],
					['MO', 17000, 53, 901000, 189000, 1.41, 1270000, 2003],
					[
						'MT',
						145000,
						66,
						9570000,
						1914000,
						1.44,
						13781000,
						2003
					],
					[
						'NE',
						45000,
						74,
						3330000,
						1299000,
						1.38,
						4595000,
						2003
					],
					[
						'NY',
						67000,
						72,
						4824000,
						1640000,
						1.36,
						6561000,
						2003
					],
					['NC', 10000, 44, 440000, 79000, 1.92, 845000, 2003],
					[
						'ND',
						340000,
						87,
						29580000,
						6803000,
						1.36,
						40229000,
						2003
					],
					[
						'SD',
						215000,
						70,
						15050000,
						2709000,
						1.43,
						21522000,
						2003
					],
					['TN', 6000, 40, 240000, 46000, 1.52, 365000, 2003],
					[
						'TX',
						140000,
						67,
						9380000,
						1126000,
						1.4,
						13132000,
						2003
					],
					[
						'WI',
						74000,
						77,
						5698000,
						2678000,
						1.47,
						8376000,
						2003
					],
					[
						'CA',
						390000,
						45,
						17550000,
						5792000,
						1.05,
						18428000,
						2004
					],
					['CO', 23000, 80, 1840000, 791000, 1.35, 2484000, 2004],
					[
						'FL',
						205000,
						98,
						20090000,
						2009000,
						1.02,
						20492000,
						2004
					],
					['GA', 63000, 49, 3087000, 648000, 1.2, 3704000, 2004],
					['HI', 8000, 96, 768000, 77000, 1.59, 1221000, 2004],
					[
						'ID',
						100000,
						63,
						6300000,
						2520000,
						1.02,
						6426000,
						2004
					],
					['IL', 7000, 55, 385000, 193000, 1.86, 716000, 2004],
					['IN', 7000, 59, 413000, 145000, 1.47, 607000, 2004],
					[
						'IA',
						35000,
						67,
						2345000,
						1337000,
						1.06,
						2486000,
						2004
					],
					[
						'MI',
						65000,
						67,
						4355000,
						2439000,
						1.16,
						5052000,
						2004
					],
					[
						'MN',
						135000,
						75,
						10125000,
						1924000,
						1.08,
						10935000,
						2004
					],
					['MS', 18000, 65, 1170000, 421000, 0.79, 924000, 2004],
					['MO', 16000, 41, 656000, 151000, 1.36, 892000, 2004],
					[
						'MT',
						140000,
						77,
						10780000,
						3773000,
						1.08,
						11642000,
						2004
					],
					[
						'NE',
						51000,
						89,
						4539000,
						2043000,
						1.01,
						4584000,
						2004
					],
					[
						'NY',
						64000,
						67,
						4288000,
						1887000,
						1.36,
						5832000,
						2004
					],
					['NC', 9000, 40, 360000, 72000, 1.93, 695000, 2004],
					[
						'ND',
						390000,
						78,
						30420000,
						9126000,
						1.05,
						31941000,
						2004
					],
					['OH', 16000, 58, 928000, 353000, 1.53, 1420000, 2004],
					[
						'OR',
						42000,
						54,
						2268000,
						1111000,
						1.21,
						2744000,
						2004
					],
					['PA', 30000, 54, 1620000, 810000, 1.42, 2300000, 2004],
					[
						'SD',
						215000,
						105,
						22575000,
						13545000,
						1.01,
						22801000,
						2004
					],
					['TN', 6000, 54, 324000, 91000, 1.73, 561000, 2004],
					[
						'TX',
						116000,
						76,
						8816000,
						1411000,
						0.97,
						8552000,
						2004
					],
					[
						'WA',
						56000,
						63,
						3528000,
						1376000,
						0.98,
						3457000,
						2004
					],
					['WV', 9000, 55, 495000, 183000, 1.41, 698000, 2004],
					[
						'WI',
						68000,
						86,
						5848000,
						2632000,
						1.19,
						6959000,
						2004
					],
					[
						'CA',
						400000,
						75,
						30000000,
						9300000,
						0.86,
						25800000,
						2005
					],
					['CO', 28000, 70, 1960000, 902000, 0.97, 1901000, 2005],
					[
						'FL',
						160000,
						86,
						13760000,
						2477000,
						0.87,
						11971000,
						2005
					],

					[
						'MI',
						65000,
						68,
						4420000,
						2519000,
						0.94,
						4155000,
						2005
					],
					[
						'MN',
						120000,
						74,
						8880000,
						1598000,
						0.9,
						7992000,
						2005
					],
					['MS', 16000, 80, 1280000, 346000, 0.67, 858000, 2005],
					['MO', 15000, 50, 750000, 180000, 1.22, 915000, 2005],
					[
						'MT',
						130000,
						67,
						8710000,
						3136000,
						0.86,
						7491000,
						2005
					],
					[
						'NE',
						40000,
						68,
						2720000,
						2530000,
						0.87,
						2366000,
						2005
					],
					['NV', 12000, 46, 552000, 442000, 3.11, 1717000, 2005],
					['NJ', 12000, 32, 384000, 104000, 1.2, 461000, 2005],
					['NM', 7000, 49, 343000, 113000, 1.03, 353000, 2005],
					[
						'NY',
						59000,
						73,
						4307000,
						2283000,
						1.34,
						5771000,
						2005
					],
					['NC', 10000, 54, 540000, 146000, 1.88, 1015000, 2005],
					[
						'ND',
						370000,
						91,
						33670000,
						8418000,
						0.83,
						27946000,
						2005
					],
					['OH', 15000, 69, 1035000, 580000, 1.4, 1449000, 2005],
					['OR', 39000, 42, 1638000, 557000, 1.08, 1769000, 2005],
					['PA', 28000, 56, 1568000, 800000, 1.12, 1756000, 2005],
					[
						'SD',
						220000,
						79,
						17380000,
						11818000,
						0.83,
						14425000,
						2005
					],
					['TN', 7000, 55, 385000, 92000, 1.67, 643000, 2005],
					['TX', 84000, 71, 5964000, 954000, 0.86, 5129000, 2005],
					['UT', 24000, 45, 1080000, 346000, 0.95, 1026000, 2005],
					['VT', 6000, 91, 546000, 169000, 1.12, 612000, 2005],
					['VA', 8000, 37, 296000, 59000, 2.2, 651000, 2005],
					[
						'WA',
						51000,
						55,
						2805000,
						1935000,
						1.01,
						2833000,
						2005
					],
					['WV', 8000, 51, 408000, 102000, 1.29, 526000, 2005],
					[
						'WI',
						64000,
						83,
						5312000,
						2922000,
						1.14,
						6056000,
						2005
					],
					[
						'MI',
						72000,
						55,
						3960000,
						2099000,
						1.15,
						4554000,
						2006
					],
					[
						'MN',
						125000,
						80,
						10000000,
						3300000,
						0.94,
						9400000,
						2006
					],
					['MS', 14000, 98, 1372000, 453000, 0.93, 1276000, 2006],
					['MO', 15000, 46, 690000, 117000, 0.98, 676000, 2006],
					[
						'MT',
						132000,
						79,
						10428000,
						1981000,
						0.95,
						9907000,
						2006
					],
					[
						'NE',
						47000,
						73,
						3431000,
						3843000,
						0.93,
						3191000,
						2006
					],
					[
						'ND',
						350000,
						74,
						25900000,
						7770000,
						0.91,
						23569000,
						2006
					],
					[
						'SD',
						225000,
						47,
						10575000,
						10575000,
						0.94,
						9941000,
						2006
					],
					[
						'WA',
						49000,
						52,
						2548000,
						1605000,
						1.24,
						3160000,
						2006
					],
					['WV', 6000, 42, 252000, 68000, 2.02, 509000, 2006],
					[
						'WI',
						64000,
						93,
						5952000,
						2500000,
						1.12,
						6666000,
						2006
					],
					['AR', 28000, 80, 2240000, 672000, 0.95, 2128000, 2007],
					[
						'CA',
						340000,
						40,
						13600000,
						3672000,
						1.04,
						14144000,
						2007
					],
					['CO', 31000, 51, 1581000, 838000, 1.15, 1818000, 2007],
					[
						'FL',
						160000,
						71,
						11360000,
						1363000,
						0.99,
						11246000,
						2007
					],
					['GA', 60000, 58, 3480000, 522000, 1.19, 4141000, 2007],
					['HI', 10000, 92, 920000, 285000, 1.7, 1564000, 2007],
					[
						'ID',
						92000,
						41,
						3772000,
						1848000,
						1.15,
						4338000,
						2007
					],
					['IL', 9000, 63, 567000, 374000, 2.49, 1412000, 2007],
					['IN', 8000, 53, 424000, 119000, 1.5, 636000, 2007],
					[
						'IA',
						26000,
						81,
						2106000,
						1221000,
						1.31,
						2759000,
						2007
					],
					['ME', 9000, 26, 234000, 59000, 1.32, 309000, 2007],
					[
						'MI',
						72000,
						64,
						4608000,
						2350000,
						1.19,
						5484000,
						2007
					],
					[
						'MN',
						130000,
						68,
						8840000,
						2564000,
						1.04,
						9194000,
						2007
					],
					['MS', 15000, 92, 1380000, 166000, 0.91, 1256000, 2007],
					['MO', 14000, 46, 644000, 148000, 1.12, 721000, 2007],
					[
						'MT',
						135000,
						68,
						9180000,
						2479000,
						0.99,
						9088000,
						2007
					],
					[
						'NE',
						45000,
						49,
						2205000,
						1477000,
						1.03,
						2271000,
						2007
					],
					[
						'NY',
						53000,
						57,
						3021000,
						1843000,
						1.38,
						4169000,
						2007
					],
					['NC', 12000, 45, 540000, 76000, 2.49, 1345000, 2007],
					[
						'ND',
						420000,
						74,
						31080000,
						9013000,
						0.96,
						29837000,
						2007
					],
					['OH', 14000, 61, 854000, 376000, 1.77, 1512000, 2007],
					[
						'OR',
						46000,
						43,
						1978000,
						1088000,
						1.31,
						2591000,
						2007
					],
					['PA', 25000, 42, 1050000, 326000, 1.7, 1785000, 2007],
					[
						'SD',
						255000,
						52,
						13260000,
						10608000,
						1.02,
						13525000,
						2007
					],
					['TN', 7000, 65, 455000, 114000, 1.99, 905000, 2007],
					[
						'TX',
						105000,
						82,
						8610000,
						1550000,
						0.96,
						8266000,
						2007
					],
					[
						'CA',
						360000,
						51,
						18360000,
						4039000,
						1.39,
						25520000,
						2008
					],
					[
						'CA',
						355000,
						33,
						11715000,
						2109000,
						1.39,
						16284000,
						2009
					],
					['CO', 28000, 53, 1484000, 326000, 1.43, 2122000, 2009],
					[
						'FL',
						170000,
						68,
						11560000,
						1618000,
						1.42,
						16415000,
						2009
					],
					['GA', 65000, 41, 2665000, 346000, 1.47, 3918000, 2009],
					['HI', 10000, 95, 950000, 323000, 1.76, 1672000, 2009],

					[
						'LA',
						37000,
						103,
						3811000,
						610000,
						1.36,
						5183000,
						2009
					],
					['ME', 6000, 50, 300000, 51000, 1.95, 585000, 2009],
					[
						'MI',
						66000,
						60,
						3960000,
						1505000,
						1.55,
						6138000,
						2009
					],
					[
						'MN',
						122000,
						65,
						7930000,
						1427000,
						1.44,
						11419000,
						2009
					],
					[
						'SD',
						270000,
						66,
						17820000,
						6237000,
						1.42,
						25304000,
						2009
					],
					['TN', 7000, 51, 357000, 86000, 2.37, 846000, 2009],
					[
						'TX',
						89000,
						63,
						5607000,
						1065000,
						1.39,
						7794000,
						2009
					],
					['UT', 26000, 38, 988000, 198000, 1.46, 1442000, 2009],
					['VT', 5000, 49, 245000, 69000, 2.01, 492000, 2009],
					['VA', 6000, 39, 234000, 56000, 3.45, 807000, 2009],
					[
						'WA',
						62000,
						44,
						2728000,
						1064000,
						1.58,
						4310000,
						2009
					],
					['WV', 5000, 37, 185000, 33000, 2.6, 481000, 2009],
					[
						'WI',
						63000,
						60,
						3780000,
						1588000,
						1.58,
						5972000,
						2009
					],
					[
						'CA',
						410000,
						67,
						27470000,
						6318000,
						1.55,
						42579000,
						2010
					],
					[
						'ID',
						97000,
						27,
						2619000,
						1179000,
						1.61,
						4217000,
						2010
					],
					[
						'MI',
						71000,
						58,
						4118000,
						1524000,
						1.67,
						6877000,
						2010
					],
					[
						'MN',
						128000,
						66,
						8448000,
						1774000,
						1.55,
						13094000,
						2010
					],
					['MS', 16000, 98, 1568000, 78000, 1.44, 2258000, 2010],
					['MO', 11000, 52, 572000, 92000, 1.8, 1030000, 2010],
					[
						'MT',
						157000,
						74,
						11618000,
						2905000,
						1.58,
						18356000,
						2010
					],
					['NE', 41000, 55, 2255000, 902000, 1.51, 3405000, 2010],
					[
						'NY',
						45000,
						64,
						2880000,
						1123000,
						1.96,
						5645000,
						2010
					],
					['NC', 13000, 46, 598000, 144000, 2.66, 1591000, 2010],
					[
						'ND',
						510000,
						91,
						46410000,
						12995000,
						1.5,
						69615000,
						2010
					],
					[
						'SD',
						265000,
						58,
						15370000,
						4765000,
						1.51,
						23209000,
						2010
					],
					['TN', 8000, 63, 504000, 106000, 2.5, 1260000, 2010],
					[
						'TX',
						100000,
						72,
						7200000,
						792000,
						1.51,
						10872000,
						2010
					],
					['VA', 5000, 37, 185000, 37000, 3.32, 614000, 2010],
					[
						'WA',
						71000,
						37,
						2627000,
						1077000,
						1.57,
						4124000,
						2010
					],
					['WV', 5000, 40, 200000, 40000, 2.39, 478000, 2010],
					[
						'WI',
						64000,
						64,
						4096000,
						1556000,
						1.68,
						6881000,
						2010
					],
					[
						'CA',
						370000,
						48,
						17760000,
						3730000,
						1.65,
						29304000,
						2011
					],
					['CO', 31000, 55, 1705000, 443000, 2, 3410000, 2011],
					[
						'FL',
						180000,
						61,
						10980000,
						988000,
						1.68,
						18446000,
						2011
					],
					['GA', 65000, 43, 2795000, 196000, 1.65, 4612000, 2011],
					['HI', 9000, 74, 666000, 246000, 3.65, 2431000, 2011],
					[
						'ID',
						87000,
						36,
						3132000,
						1879000,
						1.78,
						5575000,
						2011
					],
					[
						'MI',
						74000,
						64,
						4736000,
						2084000,
						1.81,
						8572000,
						2011
					],
					[
						'MN',
						120000,
						53,
						6360000,
						2099000,
						1.63,
						10367000,
						2011
					],
					[
						'MS',
						18000,
						115,
						2070000,
						104000,
						1.53,
						3167000,
						2011
					],
					['MO', 8000, 43, 344000, 76000, 2.14, 736000, 2011],
					[
						'NY',
						49000,
						56,
						2744000,
						1235000,
						1.96,
						5378000,
						2011
					],
					['NC', 14000, 62, 868000, 95000, 2.83, 2456000, 2011],
					[
						'ND',
						460000,
						71,
						32660000,
						7512000,
						1.67,
						54542000,
						2011
					],
					[
						'SD',
						250000,
						66,
						16500000,
						4290000,
						1.7,
						28050000,
						2011
					],
					[
						'WI',
						57000,
						63,
						3591000,
						1508000,
						1.89,
						6787000,
						2011
					],
					[
						'CA',
						330000,
						35,
						11550000,
						3119000,
						1.94,
						22407000,
						2012
					],
					['CO', 25000, 48, 1200000, 468000, 2.07, 2484000, 2012],
					[
						'FL',
						193000,
						64,
						12352000,
						1235000,
						1.84,
						22728000,
						2012
					],
					[
						'IA',
						37000,
						61,
						2257000,
						1196000,
						2.17,
						4898000,
						2012
					],
					[
						'MI',
						73000,
						57,
						4161000,
						1332000,
						2.03,
						8447000,
						2012
					],
					[
						'MN',
						125000,
						67,
						8375000,
						1591000,
						1.92,
						16080000,
						201
					],
					['MS', 18000, 118, 2124000, 64000, 1.77, 3759000, 2012],
					['MO', 7000, 53, 371000, 108000, 2.8, 1039000, 2012],
					[
						'MT',
						145000,
						52,
						7540000,
						2413000,
						1.95,
						14703000,
						2012
					],
					[
						'NE',
						43000,
						65,
						2795000,
						1146000,
						1.93,
						5394000,
						2012
					],
					[
						'ND',
						480000,
						69,
						33120000,
						5962000,
						1.92,
						63590000,
						2012
					],
					['OH', 18000, 60, 1080000, 410000, 2.46, 2657000, 2012],
					['OR', 60000, 32, 1920000, 845000, 2.16, 4147000, 2012],
					['PA', 16000, 60, 960000, 269000, 2.57, 2467000, 2012],
					[
						'SD',
						260000,
						63,
						16380000,
						3604000,
						1.95,
						31941000,
						2012
					],
					['TN', 6000, 61, 366000, 59000, 2.93, 1072000, 2012],
					['TX', 92000, 52, 4784000, 718000, 2, 9568000, 2012],
					['UT', 25000, 38, 950000, 209000, 1.87, 1777000, 2012],
					['VT', 4000, 60, 240000, 53000, 2.39, 574000, 2012],
					['VA', 4000, 41, 164000, 23000, 3.77, 618000, 2012],
					[
						'WA',
						62000,
						41,
						2542000,
						1017000,
						2.38,
						6050000,
						2012
					],
					['WV', 6000, 48, 288000, 95000, 2.91, 838000, 2012],
					[
						'WI',
						60000,
						69,
						4140000,
						1863000,
						2.05,
						8487000,
						2012
					],
					['WY', 50000, 51, 2550000, 459000, 1.87, 4769000, 2012]
				]),
				name: 'Honey Production',
				sample: true,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				id: v4.v4(),
				columns: JSON.stringify([
					{ title: 'Name', type: 'string', id: v4.v4() },
					{ title: 'Kingdom', type: 'string', id: v4.v4() },
					{ title: 'Phylum', type: 'string', id: v4.v4() },
					{ title: 'Class', type: 'string', id: v4.v4() },
					{ title: 'Order', type: 'string', id: v4.v4() },
					{ title: 'Family', type: 'string', id: v4.v4() }
				]),
				data: JSON.stringify([
					[
						'Spotted Hyena',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Carnivora',
						'Hyaenidae'
					],
					[
						'Woolly mammoth',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Proboscidea',
						'Elephantidae'
					],
					[
						'Nine-banded armadillo',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Cingulata',
						'Dasypodidae'
					],
					[
						'Donkey',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Perissodactyla',
						'Equidae'
					],
					[
						'American bison',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Artiodactyla',
						'Bovidae'
					],
					[
						'Brown-throated sloth',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Pilosa',
						'Bradypodidae'
					],
					[
						'Dog',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Carnivora',
						'Canidae'
					],
					[
						'Eastern grey kangaroo',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Diprotodontia',
						'Macropodidae'
					],
					[
						'Goat',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Artiodactyla',
						'Bovidae'
					],
					[
						'Little Owl',
						'Animalia',
						'Chordata',
						'Aves',
						'Strigiformes',
						'Strigidae'
					],
					[
						'Arctic hare',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Lagomorpha',
						'Leporidae'
					],
					[
						'European rabbit',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Lagomorpha',
						'Leporidae'
					],
					[
						'Roborovski hamster',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Rodentia',
						'Cricetidae'
					],
					[
						'Common bottlenose dolphin',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Cetacea',
						'Delphinidae'
					],
					[
						'Dodo',
						'Animalia',
						'Chordata',
						'Aves',
						'Columbiformes',
						'Columbidae'
					],
					[
						'Dugong',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Sirenia',
						'Dugongidae'
					],
					[
						'Harbor seal',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Carnivora',
						'Phocidae'
					],
					[
						'Weaver ant',
						'Animalia',
						'Arthropoda',
						'Insecta',
						'Hymenoptera',
						'Formicidae'
					],
					[
						'Giraffe',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Artiodactyla',
						'Giraffidae'
					],
					[
						'Koala',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Diprotodontia',
						'Phascolarctidae'
					],
					[
						'Llama',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Artiodactyla',
						'Camelidae'
					],
					[
						'Lion',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Carnivora',
						'Felidae'
					],
					[
						'Narwhal',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Cetacea',
						'Monodontidae'
					],
					[
						'Platypus',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Monotremata',
						'Ornithorhynchidae'
					],
					[
						'Brown Bear',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Carnivora',
						'Ursidae'
					],
					[
						'Hairy Hermit Crab',
						'Animalia',
						'Arthropoda',
						'Malacostraca',
						'Decapoda',
						'Paguridae'
					],
					[
						'Giant Panda',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Carnivora',
						'Ursidae'
					],
					[
						'Black Rat',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Rodentia',
						'Muridae'
					],
					[
						'Alligator',
						'Animalia',
						'Chordata',
						'Reptilia',
						'Crocodylia',
						'Alligatoridae'
					],
					[
						'Alligator snapping turtle',
						'Animalia',
						'Chordata',
						'Reptilia',
						'Testudines',
						'Chelydridae'
					],
					[
						'House Sparrow',
						'Animalia',
						'Chordata',
						'Aves',
						'Passeriformes',
						'Passeridae'
					],
					[
						'Mediterranean mussel',
						'Animalia',
						'Mollusca',
						'Bivalvia',
						'Mytiloida',
						'Mytilidae'
					],
					[
						'Pacific Gull',
						'Animalia',
						'Chordata',
						'Aves',
						'Charadriiformes',
						'Laridae'
					],
					[
						'Common Magpie',
						'Animalia',
						'Chordata',
						'Aves',
						'Passeriformes',
						'Corvidae'
					],
					[
						'Black Woodpecker',
						'Animalia',
						'Chordata',
						'Aves',
						'Piciformes',
						'Picidae'
					],
					[
						'Great White Pelican',
						'Animalia',
						'Chordata',
						'Aves',
						'Pelecaniformes',
						'Pelecanidae'
					],
					[
						'Boa constrictor',
						'Animalia',
						'Chordata',
						'Reptilia',
						'Squamata',
						'Boidae'
					],
					[
						'Chans megastick',
						'Animalia',
						'Arthropoda',
						'Insecta',
						'Phasmatodea',
						'Phasmatidae'
					],
					[
						'Golden Stag Beetle',
						'Animalia',
						'Arthropoda',
						'Insecta',
						'Coleoptera',
						'Lucanidae'
					],
					[
						'russet mite',
						'Animalia',
						'Arthropoda',
						'Arachnida',
						'Prostigmata',
						'Eriophyidae'
					],
					[
						'Firefly',
						'Animalia',
						'Arthropoda',
						'Insecta',
						'Coleoptera',
						'Lampyridae'
					],
					[
						'Ringlet Butterfly',
						'Animalia',
						'Arthropoda',
						'Insecta',
						'Lepidoptera',
						'Nymphalidae'
					],
					[
						'European wasp',
						'Animalia',
						'Arthropoda',
						'Insecta',
						'Hymenoptera',
						'Vespidae'
					],
					[
						'Ostrich',
						'Animalia',
						'Chordata',
						'Aves',
						'Struthioniformes',
						'Struthionidae'
					],
					[
						'Tarantula',
						'Animalia',
						'Arthropoda',
						'Arachnida',
						'Araneae',
						'Lycosidae'
					],
					[
						'giant forest scorpions',
						'Animalia',
						'Arthropoda',
						'Chelicerata',
						'Scorpiones',
						'Scorpionidae'
					],
					[
						'Pterodactylus',
						'Animalia',
						'Chordata',
						'Reptilia',
						'Pterosauria',
						'Pterodactylidae'
					],
					[
						'Zebra',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Perissodactyla',
						'Equidae'
					],
					[
						'African civet',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Carnivora',
						'Viverridae'
					],
					[
						'Mink',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Carnivora',
						'Mustelidae'
					],
					[
						'Cynoscion nebulosus',
						'Animalia',
						'Chordata',
						'Actinopterygii',
						'Perciformes',
						'Sciaenidae'
					],
					[
						'Walrus',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Carnivora',
						'Odobenidae'
					],
					[
						'Tiger',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Carnivora',
						'Felidae'
					],
					[
						'Tortoise',
						'Animalia',
						'Chordata',
						'Reptilia',
						'Chelonii',
						'Testudinidae'
					],
					[
						'Scorpionfish',
						'Animalia',
						'Chordata',
						'Actinopterygii',
						'Scorpaeniformes',
						'Scorpaenidae'
					],
					[
						'Hedgehog',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Erinaceomorpha',
						'Erinaceidae'
					],
					[
						'Reindeer',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Artiodactyla',
						'Cervidae'
					],
					[
						'Lophius piscatorius',
						'Animalia',
						'Chordata',
						'Actinopterygii',
						'Lophiiformes',
						'Lophiidae'
					],
					[
						'Guinea pig',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Rodentia',
						'Caviidae'
					],
					[
						'Penguin',
						'Animalia',
						'Chordata',
						'Aves',
						'Sphenisciformes',
						'Spheniscidae'
					],
					[
						'Blowfish',
						'Animalia',
						'Chordata',
						'Actinopterygii',
						'Tetraodontiformes',
						'Tetraodontidae'
					],
					[
						'Cockatoo',
						'Animalia',
						'Chordata',
						'Aves',
						'Psittaciformes',
						'Cacatuidae'
					],
					[
						'Leopard',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Carnivora',
						'Felidae'
					],
					[
						'Killer whale',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Cetacea',
						'Delphinidae'
					],
					[
						'Bowhead Whale',
						'Animalia',
						'Chordata',
						'Mammalia',
						'Cetacea',
						'Balaenidae'
					]
				]),
				name: 'Animal Kingdom',
				sample: true,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				id: v4.v4(),
				columns: JSON.stringify([
					{ title: 'Continent', type: 'string', id: v4.v4() },
					{ title: 'Country', type: 'string', id: v4.v4() },
					{ title: 'City', type: 'string', id: v4.v4() },
					{ title: 'Population', type: 'number', id: v4.v4() }
				]),
				data: JSON.stringify([
					['Asia', 'China', 'Shanghai', 24256800],
					['Asia', 'Pakistan', 'Karachi', 23500000],
					['Asia', 'China', 'Beijing', 21516000],
					['Asia', 'India', 'Delhi', 16787941],
					['Asia', 'China', 'Tianjin', 15200000],
					['Asia', 'Japan', 'Tokyo', 13513734],
					['Asia', 'China', 'Guangzhou', 13080500],
					['Asia', 'India', 'Mumbai', 12442373],
					['Asia', 'China', 'Shenzhen', 10467400],
					['Asia', 'Indonesia', 'Jakarta', 10075310],
					['Africa', 'Nigeria', 'Lagos', 17578000],
					['Africa', 'Egypt', 'Cairo', 11001000],
					[
						'Africa',
						'Democratic Republic of the Congo',
						'Kinshasa-Brazzaville',
						8754000
					],
					['Africa', 'Somalia', 'Mogadishu', 6346000],
					['Africa', 'Sudan', 'Khartoum-Omdurman', 5172000],
					['Africa', 'Angola', 'Luanda', 4772000],
					['Africa', 'Egypt', 'Alexandria', 4387000],
					['Africa', 'Tanzania', 'Dar es Salaam', 4364541],
					['Africa', 'Ivory Coast', 'Abidjan', 4125000],
					[
						'Africa',
						'South Africa',
						'Greater Johannesburg',
						3670000
					],
					['Europe', 'Turkey', 'Istanbul', 14025646],
					['Europe', 'Russia', 'Moscow', 12330126],
					['Europe', 'United Kingdom', 'London', 8673713],
					['Europe', 'Russia', 'Saint Petersburg', 5225690],
					['Europe', 'Germany', 'Berlin', 3562166],
					['Europe', 'Spain', 'Madrid', 3165235],
					['Europe', 'Ukraine', 'Kiev', 2909491],
					['Europe', 'Italy', 'Rome', 2874038],
					['Europe', 'France', 'Paris', 2241346],
					['Europe', 'Belarus', 'Minsk', 1949400],
					['North America', 'Mexico', 'Mexico City', 8918653],
					[
						'North America',
						'United States',
						'New York City',
						8550405
					],
					[
						'North America',
						'United States',
						'Los Angeles',
						3971883
					],
					['North America', 'Canada', 'Toronto', 2826498],
					['North America', 'United States', 'Chicago', 2720546],
					['North America', 'United States', 'Houston', 2296224],
					['North America', 'Cuba', 'Havana', 2117625],
					['North America', 'Canada', 'Montreal', 1753034],
					[
						'North America',
						'Mexico',
						'Ecatepec de Morelos',
						1677678
					],
					[
						'North America',
						'United States',
						'Philadelphia',
						1567442
					],
					['South America', 'Brazil', 'São Paulo', 11967825],
					['South America', 'Peru', 'Lima', 8894412],
					['South America', 'Colombia', 'Bogotá', 7862277],
					['South America', 'Brazil', 'Rio de Janeiro', 6476631],
					['South America', 'Chile', 'Santiago', 5507282],
					['South America', 'Venezuela', 'Caracas', 3289886],
					['South America', 'Argentina', 'Buenos Aires', 3054267],
					['South America', 'Brazil', 'Salvador', 2921087],
					['South America', 'Brazil', 'Brasília', 2914830],
					['South America', 'Brazil', 'Fortaleza', 2591188]
				]),
				name: 'Biggest cities per continent',
				sample: true,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				id: v4.v4(),
				columns: JSON.stringify([
					{ title: 'name', type: 'string', id: v4.v4() },
					{ title: 'brand', type: 'string', id: v4.v4() },
					{ title: 'economy (mpg)', type: 'number', id: v4.v4() },
					{ title: 'cylinders', type: 'number', id: v4.v4() },
					{
						title: 'displacement (cc)',
						type: 'number',
						id: v4.v4()
					},
					{ title: 'power (hp)', type: 'number', id: v4.v4() },
					{ title: 'weight (lb)', type: 'number', id: v4.v4() },
					{ title: '0-60 mph (s)', type: 'number', id: v4.v4() },
					{ title: 'year', type: 'number', id: v4.v4() }
				]),
				data: JSON.stringify([
					[
						'AMC Ambassador Brougham',
						'AMC',
						13,
						8,
						360,
						175,
						3821,
						11,
						1973
					],
					[
						'AMC Ambassador DPL',
						'AMC',
						15,
						8,
						390,
						190,
						3850,
						8.5,
						1970
					],
					[
						'AMC Ambassador SST',
						'AMC',
						17,
						8,
						304,
						150,
						3672,
						11.5,
						1972
					],
					[
						'AMC Concord DL 6',
						'AMC',
						20.2,
						6,
						232,
						90,
						3265,
						18.2,
						1979
					],
					[
						'AMC Concord DL',
						'AMC',
						18.1,
						6,
						258,
						120,
						3410,
						15.1,
						1978
					],
					[
						'AMC Concord DL',
						'AMC',
						23,
						4,
						151,
						82,
						3035,
						20.5,
						1982
					],
					[
						'AMC Concord',
						'AMC',
						19.4,
						6,
						232,
						90,
						3210,
						17.2,
						1978
					],
					[
						'AMC Concord',
						'AMC',
						24.3,
						4,
						151,
						90,
						3003,
						20.1,
						1980
					],
					[
						'AMC Hornet Sportabout (Wagon)',
						'AMC',
						18,
						6,
						258,
						110,
						2962,
						13.5,
						1971
					],
					[
						'AMC Hornet',
						'AMC',
						22.5,
						6,
						232,
						90,
						3085,
						17.6,
						1976
					],
					[
						'AMC Matador (Wagon)',
						'AMC',
						14,
						8,
						304,
						150,
						4257,
						15.5,
						1974
					],
					[
						'AMC Matador (Wagon)',
						'AMC',
						15,
						8,
						304,
						150,
						3892,
						12.5,
						1972
					],
					[
						'AMC Matador',
						'AMC',
						14,
						8,
						304,
						150,
						3672,
						11.5,
						1973
					],
					['AMC Matador', 'AMC', 15, 6, 258, 110, 3730, 19, 1975],
					[
						'AMC Matador',
						'AMC',
						15.5,
						8,
						304,
						120,
						3962,
						13.9,
						1976
					],
					['AMC Matador', 'AMC', 16, 6, 258, 110, 3632, 18, 1974],
					[
						'AMC Matador',
						'AMC',
						18,
						6,
						232,
						100,
						3288,
						15.5,
						1971
					],
					[
						'AMC Pacer D/L',
						'AMC',
						17.5,
						6,
						258,
						95,
						3193,
						17.8,
						1976
					],
					['AMC Pacer', 'AMC', 19, 6, 232, 90, 3211, 17, 1975],
					[
						'AMC Rebel SST (Wagon)',
						'AMC',
						null,
						8,
						360,
						175,
						3850,
						11,
						1970
					],
					[
						'AMC Rebel SST',
						'AMC',
						16,
						8,
						304,
						150,
						3433,
						12,
						1970
					],
					[
						'AMC Spirit DL',
						'AMC',
						27.4,
						4,
						121,
						80,
						2670,
						15,
						1979
					],
					['Audi 100 LS', 'Audi', 20, 4, 114, 91, 2582, 14, 1973],
					['Audi 100 LS', 'Audi', 23, 4, 115, 95, 2694, 15, 1975],
					[
						'Audi 100 LS',
						'Audi',
						24,
						4,
						107,
						90,
						2430,
						14.5,
						1970
					],
					[
						'Audi 4000',
						'Audi',
						34.3,
						4,
						97,
						78,
						2188,
						15.8,
						1980
					],
					[
						'Audi 5000',
						'Audi',
						20.3,
						5,
						131,
						103,
						2830,
						15.9,
						1978
					],
					[
						'Audi 5000S (Diesel)',
						'Audi',
						36.4,
						5,
						121,
						67,
						2950,
						19.9,
						1980
					],
					['Audi Fox', 'Audi', 29, 4, 98, 83, 2219, 16.5, 1974],
					['BMW 2002', 'BMW', 26, 4, 121, 113, 2234, 12.5, 1970],
					[
						'BMW 320i',
						'BMW',
						21.5,
						4,
						121,
						110,
						2600,
						12.8,
						1977
					],
					[
						'Buick Century 350',
						'Buick',
						13,
						8,
						350,
						175,
						4100,
						13,
						1973
					],
					[
						'Buick Century Limited',
						'Buick',
						25,
						6,
						181,
						110,
						2945,
						16.4,
						1982
					],
					[
						'Buick Century Luxus (Wagon)',
						'Buick',
						13,
						8,
						350,
						150,
						4699,
						14.5,
						1974
					],
					[
						'Buick Century Special',
						'Buick',
						20.6,
						6,
						231,
						105,
						3380,
						15.8,
						1978
					],
					[
						'Buick Century',
						'Buick',
						17,
						6,
						231,
						110,
						3907,
						21,
						1975
					],

					[
						'Buick Opel Isuzu Deluxe',
						'Buick',
						30,
						4,
						111,
						80,
						2155,
						14.8,
						1977
					],
					[
						'Buick Regal Sport Coupe (Turbo)',
						'Buick',
						17.7,
						6,
						231,
						165,
						3445,
						13.4,
						1978
					],
					[
						'Buick Skyhawk',
						'Buick',
						21,
						6,
						231,
						110,
						3039,
						15,
						1975
					],
					[
						'Buick Skylark 320',
						'Buick',
						15,
						8,
						350,
						165,
						3693,
						11.5,
						1970
					],
					[
						'Buick Skylark Limited',
						'Buick',
						28.4,
						4,
						151,
						90,
						2670,
						16,
						1979
					],
					[
						'Buick Skylark',
						'Buick',
						20.5,
						6,
						231,
						105,
						3425,
						16.9,
						1977
					],
					[
						'Buick Skylark',
						'Buick',
						26.6,
						4,
						151,
						84,
						2635,
						16.4,
						1981
					],
					[
						'Cadillac Eldorado',
						'Cadillac',
						23,
						8,
						350,
						125,
						3900,
						17.4,
						1979
					],
					[
						'Cadillac Seville',
						'Cadillac',
						16.5,
						8,
						350,
						180,
						4380,
						12.1,
						1976
					],
					[
						'Chevroelt Chevelle Malibu',
						'Chevrolet',
						16,
						6,
						250,
						105,
						3897,
						18.5,
						1975
					],
					[
						'Chevrolet Bel Air',
						'Chevrolet',
						15,
						8,
						350,
						145,
						4440,
						14,
						1975
					],
					[
						'Chevrolet Camaro',
						'Chevrolet',
						27,
						4,
						151,
						90,
						2950,
						17.3,
						1982
					],
					[
						'Chevrolet Caprice Classic',
						'Chevrolet',
						13,
						8,
						400,
						150,
						4464,
						12,
						1973
					],

					[
						'Chevrolet Chevelle Malibu',
						'Chevrolet',
						17,
						6,
						250,
						100,
						3329,
						15.5,
						1971
					],
					[
						'Chevrolet Chevelle Malibu',
						'Chevrolet',
						18,
						8,
						307,
						130,
						3504,
						12,
						1970
					],
					[
						'Chevrolet Chevette',
						'Chevrolet',
						29,
						4,
						85,
						52,
						2035,
						22.2,
						1976
					],
					[
						'Chevrolet Chevette',
						'Chevrolet',
						30,
						4,
						98,
						68,
						2155,
						16.5,
						1978
					],
					[
						'Chevrolet Chevette',
						'Chevrolet',
						30.5,
						4,
						98,
						63,
						2051,
						17,
						1977
					],
					[
						'Chevrolet Chevette',
						'Chevrolet',
						32.1,
						4,
						98,
						70,
						2120,
						15.5,
						1980
					],
					[
						'Chevrolet Citation',
						'Chevrolet',
						23.5,
						6,
						173,
						110,
						2725,
						12.6,
						1981
					],
					[
						'Chevrolet Citation',
						'Chevrolet',
						28,
						4,
						151,
						90,
						2678,
						16.5,
						1980
					],
					[
						'Chevrolet Citation',
						'Chevrolet',
						28.8,
						6,
						173,
						115,
						2595,
						11.3,
						1979
					],
					[
						'Chevrolet Concours',
						'Chevrolet',
						17.5,
						6,
						250,
						110,
						3520,
						16.4,
						1977
					],
					[
						'Chevrolet Impala',
						'Chevrolet',
						11,
						8,
						400,
						150,
						4997,
						14,
						1973
					],
					[
						'Chevrolet Impala',
						'Chevrolet',
						13,
						8,
						350,
						165,
						4274,
						12,
						1972
					],
					[
						'Chevrolet Impala',
						'Chevrolet',
						14,
						8,
						350,
						165,
						4209,
						12,
						1971
					],
					[
						'Chevrolet Impala',
						'Chevrolet',
						14,
						8,
						454,
						220,
						4354,
						9,
						1970
					],
					[
						'Chevrolet Malibu Classic (Wagon)',
						'Chevrolet',
						19.2,
						8,
						267,
						125,
						3605,
						15,
						1979
					],
					[
						'Chevrolet Malibu',
						'Chevrolet',
						13,
						8,
						350,
						145,
						3988,
						13,
						1973
					],
					[
						'Chevrolet Malibu',
						'Chevrolet',
						20.5,
						6,
						200,
						95,
						3155,
						18.2,
						1978
					],
					[
						'Chevrolet Monte Carlo Landau',
						'Chevrolet',
						15.5,
						8,
						350,
						170,
						4165,
						11.4,
						1977
					],
					[
						'Chevrolet Monte Carlo Landau',
						'Chevrolet',
						19.2,
						8,
						305,
						145,
						3425,
						13.2,
						1978
					],
					[
						'Chevrolet Monte Carlo S',
						'Chevrolet',
						15,
						8,
						350,
						145,
						4082,
						13,
						1973
					],
					[
						'Chevrolet Monza 2+2',
						'Chevrolet',
						20,
						8,
						262,
						110,
						3221,
						13.5,
						1975
					],
					[
						'Chevrolet Nova Custom',
						'Chevrolet',
						16,
						6,
						250,
						100,
						3278,
						18,
						1973
					],
					[
						'Chevrolet Nova',
						'Chevrolet',
						15,
						6,
						250,
						100,
						3336,
						17,
						1974
					],
					[
						'Chevrolet Nova',
						'Chevrolet',
						18,
						6,
						250,
						105,
						3459,
						16,
						1975
					],
					[
						'Chevrolet Nova',
						'Chevrolet',
						22,
						6,
						250,
						105,
						3353,
						14.5,
						1976
					],
					[
						'Chevrolet Vega (Wagon)',
						'Chevrolet',
						22,
						4,
						140,
						72,
						2408,
						19,
						1971
					],
					[
						'Chevrolet Vega 2300',
						'Chevrolet',
						28,
						4,
						140,
						90,
						2264,
						15.5,
						1971
					],
					[
						'Chevrolet Vega',
						'Chevrolet',
						20,
						4,
						140,
						90,
						2408,
						19.5,
						1972
					],
					[
						'Chevrolet Vega',
						'Chevrolet',
						21,
						4,
						140,
						72,
						2401,
						19.5,
						1973
					],
					[
						'Chevrolet Vega',
						'Chevrolet',
						25,
						4,
						140,
						75,
						2542,
						17,
						1974
					],
					[
						'Chevrolet Woody',
						'Chevrolet',
						24.5,
						4,
						98,
						60,
						2164,
						22.1,
						1976
					],
					['Chevy C10', 'Chevy', 13, 8, 350, 145, 4055, 12, 1976],
					['Chevy C20', 'Chevy', 10, 8, 307, 200, 4376, 15, 1970],
					[
						'Chevy S-10',
						'Chevy',
						31,
						4,
						119,
						82,
						2720,
						19.4,
						1982
					],
					[
						'Chrysler Cordoba',
						'Chrysler',
						15.5,
						8,
						400,
						190,
						4325,
						12.2,
						1977
					],
					[
						'Chrysler Lebaron Medallion',
						'Chrysler',
						26,
						4,
						156,
						92,
						2585,
						14.5,
						1982
					],
					[
						'Chrysler Lebaron Salon',
						'Chrysler',
						17.6,
						6,
						225,
						85,
						3465,
						16.6,
						1981
					],
					[
						'Chrysler Lebaron Town & Country (Wagon)',
						'Chrysler',
						18.5,
						8,
						360,
						150,
						3940,
						13,
						1981
					],
					[
						'Chrysler New Yorker Brougham',
						'Chrysler',
						13,
						8,
						440,
						215,
						4735,
						11,
						1973
					],
					[
						'Chrysler Newport Royal',
						'Chrysler',
						13,
						8,
						400,
						190,
						4422,
						12.5,
						1972
					],
					[
						'Citroen DS-21 Pallas',
						'Citroen',
						null,
						4,
						133,
						115,
						3090,
						17.5,
						1970
					],
					[
						'Datsun 1200',
						'Datsun',
						35,
						4,
						72,
						69,
						1613,
						18,
						1971
					],
					[
						'Datsun 200SX',
						'Datsun',
						23.9,
						4,
						119,
						97,
						2405,
						14.9,
						1978
					],
					[
						'Datsun 210',
						'Datsun',
						31.8,
						4,
						85,
						65,
						2020,
						19.2,
						1979
					],
					[
						'Datsun 210',
						'Datsun',
						37,
						4,
						85,
						65,
						1975,
						19.4,
						1981
					],
					[
						'Datsun 210',
						'Datsun',
						40.8,
						4,
						85,
						65,
						2110,
						19.2,
						1980
					],
					[
						'Datsun 280ZX',
						'Datsun',
						32.7,
						6,
						168,
						132,
						2910,
						11.4,
						1980
					],
					[
						'Datsun 310 GX',
						'Datsun',
						38,
						4,
						91,
						67,
						1995,
						16.2,
						1982
					],
					[
						'Datsun 310',
						'Datsun',
						37.2,
						4,
						86,
						65,
						2019,
						16.4,
						1980
					],
					[
						'Datsun 510 (Wagon)',
						'Datsun',
						28,
						4,
						97,
						92,
						2288,
						17,
						1972
					],
					[
						'Datsun 510 Hatchback',
						'Datsun',
						37,
						4,
						119,
						92,
						2434,
						15,
						1980
					],
					[
						'Datsun 510',
						'Datsun',
						27.2,
						4,
						119,
						97,
						2300,
						14.7,
						1978
					],
					[
						'Datsun 610',
						'Datsun',
						22,
						4,
						108,
						94,
						2379,
						16.5,
						1973
					],
					[
						'Datsun 710',
						'Datsun',
						24,
						4,
						119,
						97,
						2545,
						17,
						1975
					],
					['Datsun 710', 'Datsun', 32, 4, 83, 61, 2003, 19, 1974],
					[
						'Datsun 810 Maxima',
						'Datsun',
						24.2,
						6,
						146,
						120,
						2930,
						13.8,
						1981
					],
					[
						'Datsun 810',
						'Datsun',
						22,
						6,
						146,
						97,
						2815,
						14.5,
						1977
					],
					[
						'Datsun B-210',
						'Datsun',
						32,
						4,
						85,
						70,
						1990,
						17,
						1976
					],
					[
						'Datsun B210 GX',
						'Datsun',
						39.4,
						4,
						85,
						70,
						2070,
						18.6,
						1978
					],
					[
						'Datsun B210',
						'Datsun',
						31,
						4,
						79,
						67,
						1950,
						19,
						1974
					],
					[
						'Datsun F-10 Hatchback',
						'Datsun',
						33.5,
						4,
						85,
						70,
						1945,
						16.8,
						1977
					],
					[
						'Datsun PL510',
						'Datsun',
						27,
						4,
						97,
						88,
						2130,
						14.5,
						1970
					],
					[
						'Datsun PL510',
						'Datsun',
						27,
						4,
						97,
						88,
						2130,
						14.5,
						1971
					],
					[
						'Dodge Aries SE',
						'Dodge',
						29,
						4,
						135,
						84,
						2525,
						16,
						1982
					],
					[
						'Dodge Aries Wagon (Wagon)',
						'Dodge',
						25.8,
						4,
						156,
						92,
						2620,
						14.4,
						1981
					],
					[
						'Dodge Aspen 6',
						'Dodge',
						20.6,
						6,
						225,
						110,
						3360,
						16.6,
						1979
					],
					[
						'Dodge Aspen SE',
						'Dodge',
						20,
						6,
						225,
						100,
						3651,
						17.7,
						1976
					],
					[
						'Dodge Aspen',
						'Dodge',
						18.6,
						6,
						225,
						110,
						3620,
						18.7,
						1978
					],
					[
						'Dodge Aspen',
						'Dodge',
						19.1,
						6,
						225,
						90,
						3381,
						18.7,
						1980
					],
					[
						'Dodge Challenger SE',
						'Dodge',
						15,
						8,
						383,
						170,
						3563,
						10,
						1970
					],
					[
						'Dodge Charger 2.2',
						'Dodge',
						36,
						4,
						135,
						84,
						2370,
						13,
						1982
					],
					[
						'Dodge Colt (Wagon)',
						'Dodge',
						28,
						4,
						98,
						80,
						2164,
						15,
						1972
					],
					[
						'Dodge Colt Hardtop',
						'Dodge',
						25,
						4,
						97.5,
						80,
						2126,
						17,
						1972
					],
					[
						'Dodge Colt Hatchback Custom',
						'Dodge',
						35.7,
						4,
						98,
						80,
						1915,
						14.4,
						1979
					],
					[
						'Dodge Colt M/M',
						'Dodge',
						33.5,
						4,
						98,
						83,
						2075,
						15.9,
						1977
					],
					[
						'Dodge Colt',
						'Dodge',
						26,
						4,
						98,
						79,
						2255,
						17.7,
						1976
					],
					[
						'Dodge Colt',
						'Dodge',
						27.9,
						4,
						156,
						105,
						2800,
						14.4,
						1980
					],
					[
						'Dodge Colt',
						'Dodge',
						28,
						4,
						90,
						75,
						2125,
						14.5,
						1974
					],
					[
						'Dodge Coronet Brougham',
						'Dodge',
						16,
						8,
						318,
						150,
						4190,
						13,
						1976
					],
					[
						'Dodge Coronet Custom (Wagon)',
						'Dodge',
						14,
						8,
						318,
						150,
						4457,
						13.5,
						1974
					],
					[
						'Dodge Coronet Custom',
						'Dodge',
						15,
						8,
						318,
						150,
						3777,
						12.5,
						1973
					],
					[
						'Dodge D100',
						'Dodge',
						13,
						8,
						318,
						150,
						3755,
						14,
						1976
					],
					[
						'Dodge D200',
						'Dodge',
						11,
						8,
						318,
						210,
						4382,
						13.5,
						1970
					],
					[
						'Dodge Dart Custom',
						'Dodge',
						15,
						8,
						318,
						150,
						3399,
						11,
						1973
					],
					[
						'Dodge Diplomat',
						'Dodge',
						19.4,
						8,
						318,
						140,
						3735,
						13.2,
						1978
					],
					[
						'Dodge Magnum XE',
						'Dodge',
						17.5,
						8,
						318,
						140,
						4080,
						13.7,
						1978
					],
					[
						'Dodge Monaco (Wagon)',
						'Dodge',
						12,
						8,
						383,
						180,
						4955,
						11.5,
						1971
					],
					[
						'Dodge Monaco Brougham',
						'Dodge',
						15.5,
						8,
						318,
						145,
						4140,
						13.7,
						1977
					],
					[
						'Dodge Omni',
						'Dodge',
						30.9,
						4,
						105,
						75,
						2230,
						14.5,
						1978
					],
					[
						'Dodge Rampage',
						'Dodge',
						32,
						4,
						135,
						84,
						2295,
						11.6,
						1982
					],
					[
						'Dodge St. Regis',
						'Dodge',
						18.2,
						8,
						318,
						135,
						3830,
						15.2,
						1979
					],
					[
						'Fiat 124 Sport Coupe',
						'Fiat',
						26,
						4,
						98,
						90,
						2265,
						15.5,
						1973
					],
					[
						'Ford Gran Torino',
						'Ford',
						14,
						8,
						302,
						137,
						4042,
						14.5,
						1973
					],
					[
						'Ford Gran Torino',
						'Ford',
						14.5,
						8,
						351,
						152,
						4215,
						12.8,
						1976
					],
					[
						'Ford Gran Torino',
						'Ford',
						16,
						8,
						302,
						140,
						4141,
						14,
						1974
					],
					[
						'Ford Granada Ghia',
						'Ford',
						18,
						6,
						250,
						78,
						3574,
						21,
						1976
					],
					[
						'Ford Granada GL',
						'Ford',
						20.2,
						6,
						200,
						88,
						3060,
						17.1,
						1981
					],
					[
						'Ford Granada L',
						'Ford',
						22,
						6,
						232,
						112,
						2835,
						14.7,
						1982
					],
					[
						'Ford Granada',
						'Ford',
						18.5,
						6,
						250,
						98,
						3525,
						19,
						1977
					],
					[
						'Ford LTD Landau',
						'Ford',
						17.6,
						8,
						302,
						129,
						3725,
						13.4,
						1979
					],
					[
						'Mercury Monarch Ghia',
						'Mercury',
						20.2,
						8,
						302,
						139,
						3570,
						12.8,
						1978
					],
					[
						'Mercury Monarch',
						'Mercury',
						15,
						6,
						250,
						72,
						3432,
						21,
						1975
					],
					[
						'Mercury Zephyr 6',
						'Mercury',
						19.8,
						6,
						200,
						85,
						2990,
						18.2,
						1979
					],
					[
						'Mercury Zephyr',
						'Mercury',
						20.8,
						6,
						200,
						85,
						3070,
						16.7,
						1978
					],
					[
						'Volvo Diesel',
						'Volvo',
						30.7,
						6,
						145,
						76,
						3160,
						19.6,
						1981
					]
				]),
				name: 'Cars',
				sample: true,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				id: v4.v4(),
				columns: JSON.stringify([
					{ title: 'Letter', type: 'string', id: v4.v4() },
					{ title: 'Language', type: 'string', id: v4.v4() },
					{ title: 'Frequency', type: 'number', id: v4.v4() },
					{ title: 'Rank', type: 'string', id: v4.v4() }
				]),
				data: JSON.stringify([
					['a', 'English', 0.08, 3],
					['b', 'English', 0.01, 'other'],
					['c', 'English', 0.03, 'other'],
					['d', 'English', 0.04, 'other'],
					['e', 'English', 0.13, 1],
					['f', 'English', 0.02, 'other'],
					['g', 'English', 0.02, 'other'],
					['h', 'English', 0.06, 'other'],
					['i', 'English', 0.07, 'other'],
					['j', 'English', 0, 'other'],
					['k', 'English', 0.01, 'other'],
					['l', 'English', 0.04, 'other'],
					['m', 'English', 0.02, 'other'],
					['n', 'English', 0.07, 'other'],
					['o', 'English', 0.08, 'other'],
					['p', 'English', 0.02, 'other'],
					['q', 'English', 0, 'other'],
					['r', 'English', 0.06, 'other'],
					['s', 'English', 0.06, 'other'],
					['t', 'English', 0.09, 2],
					['u', 'English', 0.03, 'other'],
					['v', 'English', 0.01, 'other'],
					['w', 'English', 0.02, 'other'],
					['x', 'English', 0, 'other'],
					['y', 'English', 0.02, 'other'],
					['z', 'English', 0, 'other'],
					['a', 'German', 0.07, 'other'],
					['b', 'German', 0.02, 'other'],
					['c', 'German', 0.03, 'other'],
					['d', 'German', 0.05, 'other'],
					['e', 'German', 0.16, 1],
					['f', 'German', 0.02, 'other'],
					['g', 'German', 0.03, 'other'],
					['h', 'German', 0.05, 'other'],
					['i', 'German', 0.07, 'other'],
					['j', 'German', 0, 'other'],
					['k', 'German', 0.01, 'other'],
					['l', 'German', 0.03, 'other'],
					['m', 'German', 0.03, 'other'],
					['n', 'German', 0.1, 2],
					['o', 'German', 0.03, 'other'],
					['p', 'German', 0.01, 'other'],
					['q', 'German', 0, 'other'],
					['r', 'German', 0.07, 'other'],
					['s', 'German', 0.07, 3],
					['t', 'German', 0.06, 'other'],
					['u', 'German', 0.04, 'other'],
					['v', 'German', 0.01, 'other'],
					['w', 'German', 0.02, 'other'],
					['x', 'German', 0, 'other'],
					['y', 'German', 0, 'other'],
					['z', 'German', 0.01, 'other'],
					['a', 'Italian', 0.12, 2],
					['b', 'Italian', 0.01, 'other'],
					['c', 'Italian', 0.05, 'other'],
					['d', 'Italian', 0.04, 'other'],
					['e', 'Italian', 0.12, 1],
					['f', 'Italian', 0.01, 'other'],
					['g', 'Italian', 0.02, 'other'],
					['h', 'Italian', 0.01, 'other'],
					['i', 'Italian', 0.1, 3],
					['j', 'Italian', 0, 'other'],
					['k', 'Italian', 0, 'other'],
					['l', 'Italian', 0.07, 'other'],
					['m', 'Italian', 0.03, 'other'],
					['n', 'Italian', 0.07, 'other'],
					['o', 'Italian', 0.1, 'other'],
					['p', 'Italian', 0.03, 'other'],
					['q', 'Italian', 0.01, 'other'],
					['r', 'Italian', 0.06, 'other'],
					['s', 'Italian', 0.05, 'other'],
					['t', 'Italian', 0.06, 'other'],
					['u', 'Italian', 0.03, 'other'],
					['v', 'Italian', 0.02, 'other'],
					['w', 'Italian', 0, 'other'],
					['x', 'Italian', 0, 'other'],
					['y', 'Italian', 0, 'other'],
					['z', 'Italian', 0.01, 'other']
				]),
				name: 'Most frequent letters',
				sample: true,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				id: v4.v4(),
				columns: JSON.stringify([
					{ title: 'Movie', type: 'string', id: v4.v4() },
					{ title: 'Genre', type: 'string', id: v4.v4() },
					{
						title: 'Production Budget (millions)',
						type: 'number',
						id: v4.v4()
					},
					{
						title: 'Box Office (millions)',
						type: 'number',
						id: v4.v4()
					},
					{ title: 'ROI', type: 'number', id: v4.v4() },
					{ title: 'Rating IMDB', type: 'number', id: v4.v4() }
				]),
				data: JSON.stringify([
					['Avatar', 'Action', 237, 2784, 11.7, 8],
					['The Blind Side', 'Drama', 29, 309, 10.7, 7.6],
					[
						'The Chronicles of Narnia: The Lion, the Witch and the Wardrobe',
						'Adventure',
						180,
						745,
						4.1,
						6.9
					],
					['The Dark Knight', 'Action', 185, 1005, 5.4, 9],
					[
						'ET: The Extra-Terrestrial',
						'Drama',
						11,
						793,
						75.5,
						7.9
					],
					['Finding Nemo', 'Adventure', 94, 940, 10, 8.1],
					['Ghostbusters', 'Comedy', 144, 229, 1.6, 7.8],
					[
						'The Hunger Games',
						'Thriller/Suspense',
						78,
						649,
						8.3,
						7.2
					],
					['Iron Man 3', 'Action', 178, 1215, 6.8, 7.6],
					['Jurassic Park', 'Action', 53, 1030, 19.4, 8],
					['King Kong', 'Adventure', 207, 551, 2.7, 7.3],
					['The Lion King', 'Adventure', 45, 968, 21.5, 8.4],
					['Monsters, Inc.', 'Adventure', 115, 577, 5, 8],
					[
						'The Twilight Saga: New Moon',
						'Drama',
						50,
						710,
						14.2,
						4.5
					],
					[
						'Oz the Great and Powerful',
						'Adventure',
						160,
						493,
						3.1,
						6.6
					],
					[
						"Pirates of the Caribbean: Dead Man's Chest",
						'Adventure',
						225,
						1066,
						4.7,
						7.3
					],
					['Quantum of Solace', 'Action', 200, 586, 2.9, 6.7],
					[
						'Raiders of the Lost Ark',
						'Adventure',
						18,
						390,
						21.7,
						8.7
					],
					[
						'Star Wars Ep. I: The Phantom Menace',
						'Adventure',
						115,
						1027,
						8.9,
						6.5
					],
					['Titanic', 'Thriller/Suspense', 200, 2187, 10.9, 7.6],
					['Up', 'Adventure', 175, 735, 4.2, 8.3],
					['The Vow', 'Drama', 30, 196, 6.5, 6.7],
					['The War of the Worlds', 'Action', 132, 704, 5.3, 6.5],
					['X-Men: The Last Stand', 'Action', 210, 459, 2.2, 6.8],
					["You've Got Mail", 'Drama', 65, 251, 3.9, 6.3],
					['Zookeeper', 'Romantic Comedy', 80, 170, 2.1, 5]
				]),
				name: 'Movies',
				sample: true,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				id: v4.v4(),
				columns: JSON.stringify([
					{ title: 'Country', type: 'string', id: v4.v4() },
					{
						title: 'Internet Users',
						type: 'number',
						id: v4.v4()
					},
					{
						title: 'Penetration (% of Pop)',
						type: 'number',
						id: v4.v4()
					},
					{ title: 'Population', type: 'number', id: v4.v4() },
					{
						title: 'Non-Users (internetless)',
						type: 'number',
						id: v4.v4()
					},
					{
						title: 'Users 1 Year Change (%)',
						type: 'number',
						id: v4.v4()
					},
					{
						title: 'Internet Users 1 Year Change',
						type: 'number',
						id: v4.v4()
					},
					{
						title: 'Population 1 Y Change',
						type: 'number',
						id: v4.v4()
					}
				]),
				data: JSON.stringify([
					[
						'China',
						721434547,
						52.2,
						1382323332,
						660888785,
						2.2,
						15520515,
						0.46
					],
					[
						'India',
						462124989,
						34.8,
						1326801576,
						864676587,
						30.5,
						108010242,
						1.2
					],
					[
						'United States',
						286942362,
						88.5,
						324118787,
						37176425,
						1.1,
						3229955,
						0.73
					],
					[
						'Brazil',
						139111185,
						66.4,
						209567920,
						70456735,
						5.1,
						6753879,
						0.83
					],
					[
						'Japan',
						115111595,
						91.1,
						126323715,
						11212120,
						0.1,
						117385,
						-0.2
					],
					[
						'Russia',
						102258256,
						71.3,
						143439832,
						41181576,
						0.3,
						330067,
						-0.01
					],
					[
						'Nigeria',
						86219965,
						46.1,
						186987563,
						100767598,
						5,
						4124967,
						2.63
					],
					[
						'Germany',
						71016605,
						88,
						80682351,
						9665746,
						0.6,
						447557,
						-0.01
					],
					[
						'United Kingdom',
						60273385,
						92.6,
						65111143,
						4837758,
						0.9,
						555411,
						0.61
					],
					[
						'Mexico',
						58016997,
						45.1,
						128632004,
						70615007,
						2.1,
						1182988,
						1.27
					],
					[
						'France',
						55860330,
						86.4,
						64668129,
						8807799,
						1.4,
						758852,
						0.42
					],
					[
						'Indonesia',
						53236719,
						20.4,
						260581100,
						207344381,
						6.5,
						3232544,
						1.17
					],
					[
						'Viet Nam',
						49063762,
						52,
						94444200,
						45380438,
						3.3,
						1564346,
						1.07
					],
					[
						'Turkey',
						46196720,
						58,
						79622062,
						33425342,
						5.1,
						2242750,
						1.22
					],
					[
						'Philippines',
						44478808,
						43.5,
						102250133,
						57771325,
						4.4,
						1855574,
						1.54
					],
					[
						'South Korea',
						43274132,
						85.7,
						50503933,
						7229801,
						1.2,
						522375,
						0.42
					],
					[
						'Italy',
						39211518,
						65.6,
						59801004,
						20589486,
						1.7,
						666922,
						0.01
					],
					[
						'Iran',
						39149103,
						48.9,
						80043146,
						40894043,
						7.7,
						2784831,
						1.18
					],
					[
						'Spain',
						37865104,
						82.2,
						46064604,
						8199500,
						2.2,
						805002,
						-0.12
					],
					[
						'Pakistan',
						34342400,
						17.8,
						192826502,
						158484102,
						9.7,
						3024054,
						2.07
					],
					[
						'Canada',
						32120519,
						88.5,
						36286378,
						4165859,
						1.8,
						559167,
						0.96
					],
					[
						'Egypt',
						30835256,
						33,
						93383574,
						62548318,
						3.3,
						990548,
						2.05
					],
					[
						'Argentina',
						30359855,
						69.2,
						43847277,
						13487422,
						3.1,
						904688,
						0.99
					],
					[
						'Thailand',
						29078158,
						42.7,
						68146609,
						39068451,
						6.2,
						1708982,
						0.28
					],
					[
						'South Africa',
						28580290,
						52,
						54978907,
						26398617,
						3.9,
						1078982,
						0.9
					],
					[
						'Poland',
						27922152,
						72.4,
						38593161,
						10671009,
						2.5,
						670522,
						-0.05
					],
					[
						'Colombia',
						27664747,
						56.9,
						48654392,
						20989645,
						4.9,
						1296764,
						0.88
					],
					[
						'Kenya',
						21248977,
						45,
						47251449,
						26002472,
						3.7,
						763171,
						2.61
					],
					[
						'Malaysia',
						21090777,
						68.6,
						30751602,
						9660825,
						2.2,
						45356,
						1.39
					],
					[
						'Saudi Arabia',
						20813695,
						64.7,
						32157974,
						11344279,
						2.8,
						561748,
						1.96
					],
					[
						'Australia',
						20679490,
						85.1,
						24309330,
						3629840,
						1.7,
						350522,
						1.42
					],
					[
						'Morocco',
						20068556,
						57.6,
						34817065,
						14748509,
						1.7,
						342534,
						1.28
					],
					[
						'Ukraine',
						19678089,
						44.1,
						44624373,
						24946284,
						0.4,
						68947,
						-0.44
					],
					[
						'Venezuela',
						18254349,
						57.9,
						31518855,
						13264506,
						2.1,
						380889,
						1.32
					],
					[
						'Netherlands',
						15915076,
						93.7,
						16979729,
						1064653,
						0.6,
						98813,
						0.32
					],
					[
						'Uzbekistan',
						15453227,
						51,
						30300446,
						14847219,
						6.1,
						893596,
						1.36
					],
					[
						'Chile',
						14108392,
						77.8,
						18131850,
						4023458,
						3.3,
						444149,
						1.02
					],
					[
						'Peru',
						13036965,
						41,
						31774225,
						18737260,
						1.9,
						244248,
						1.27
					],
					[
						'Romania',
						11236186,
						58,
						19372734,
						8136548,
						1.4,
						155259,
						-0.71
					],
					[
						'Sudan',
						10886813,
						26.4,
						41175541,
						30288728,
						4.5,
						471726,
						2.34
					],
					[
						'Belgium',
						10060745,
						88.5,
						11371928,
						1311183,
						1.9,
						184645,
						0.64
					],
					[
						'Kazakhstan',
						9961519,
						55.8,
						17855384,
						7893865,
						1.8,
						176681,
						1.31
					],
					[
						'Czech Republic',
						9323428,
						88.4,
						10548058,
						1224630,
						3.2,
						285731,
						0.05
					],
					[
						'Sweden',
						9169705,
						93.1,
						9851852,
						682147,
						1,
						94636,
						0.74
					],
					[
						'United Arab Emirates',
						8515420,
						91.9,
						9266971,
						751551,
						1.7,
						14334,
						1.2
					],
					[
						'Ghana',
						7958675,
						28.4,
						28033375,
						20074700,
						14,
						976984,
						2.27
					],
					[
						'Algeria',
						7937913,
						19.7,
						40375954,
						32438041,
						4.3,
						329755,
						1.79
					],
					[
						'Hungary',
						7874733,
						80.2,
						9821318,
						1946585,
						1.2,
						95696,
						-0.34
					],
					[
						'Uganda',
						7645197,
						19,
						40322768,
						32677571,
						5.5,
						395857,
						3.31
					],
					[
						'Switzerland',
						7302714,
						87.2,
						8379477,
						1076763,
						1,
						74342,
						0.97
					],
					[
						'Greece',
						7072534,
						64.8,
						10919459,
						3846925,
						0.4,
						29742,
						-0.32
					],
					[
						'Ecuador',
						7055575,
						43.1,
						16385450,
						9329875,
						1.5,
						106663,
						1.49
					],
					[
						'Austria',
						6953400,
						81.1,
						8569633,
						1616233,
						0.3,
						2381,
						0.29
					],
					[
						'Portugal',
						6930762,
						67.3,
						10304434,
						3373672,
						0.8,
						54608,
						-0.44
					],
					[
						'Yemen',
						6773228,
						24.7,
						27477600,
						20704372,
						5.2,
						332117,
						2.41
					],
					[
						'Sri Lanka',
						6087164,
						29.3,
						20810816,
						14723652,
						4.2,
						247259,
						0.46
					],
					[
						'Azerbaijan',
						6027647,
						61.1,
						9868447,
						3840800,
						1.2,
						72153,
						1.17
					],
					[
						'Angola',
						5951453,
						23,
						25830958,
						19879505,
						5.7,
						323337,
						3.23
					],
					[
						'Israel',
						5941174,
						72.5,
						8192463,
						2251289,
						2.1,
						119516,
						1.59
					],
					[
						'Belarus',
						5786572,
						61,
						9481521,
						3694949,
						0.9,
						49737,
						-0.15
					],
					[
						'Dominican Republic',
						5513852,
						51.8,
						10648613,
						5134761,
						2.5,
						133844,
						1.14
					],
					[
						'Syria',
						5502250,
						29.6,
						18563595,
						13061345,
						2,
						106142,
						0.33
					],
					[
						'Denmark',
						5479054,
						96.3,
						5690750,
						211696,
						0.5,
						25936,
						0.38
					],
					[
						'Tunisia',
						5472618,
						48.1,
						11375220,
						5902602,
						2.4,
						126113,
						1.08
					],
					[
						'Norway',
						5167573,
						98,
						5271958,
						104385,
						1.7,
						87185,
						1.17
					],
					[
						"Côte d'Ivoire",
						5122897,
						22,
						23254184,
						18131287,
						14.3,
						640961,
						2.43
					],
					[
						'Finland',
						5107402,
						92.5,
						5523904,
						416502,
						0.4,
						20264,
						0.37
					],
					[
						'Nepal',
						4962323,
						17.2,
						28850717,
						23888394,
						4.5,
						21287,
						1.18
					],
					[
						'Iraq',
						4892463,
						13,
						37547686,
						32655223,
						7.5,
						339539,
						3.09
					],
					[
						'Serbia',
						4758861,
						54,
						8812705,
						4053844,
						-0.1,
						-6757,
						-0.43
					],
					[
						'Singapore',
						4699204,
						82.5,
						5696506,
						997302,
						2,
						90352,
						1.66
					],
					[
						'Lebanon',
						4545007,
						75.9,
						5988153,
						1443146,
						3.2,
						139538,
						2.35
					],
					[
						'Bolivia',
						4478400,
						41.1,
						10888402,
						6410002,
						3.1,
						136733,
						1.53
					],
					[
						'Slovakia',
						4477641,
						82.5,
						5429418,
						951777,
						1,
						4401,
						0.06
					],
					[
						'Guatemala',
						4409997,
						26.5,
						16672956,
						12262959,
						5.8,
						240223,
						2.02
					],
					[
						'Cameroon',
						4311178,
						18,
						23924407,
						19613229,
						16.5,
						609593,
						2.49
					],
					[
						'Ethiopia',
						4288023,
						4.2,
						101853268,
						97565245,
						13.4,
						506738,
						2.48
					],
					[
						'Bulgaria',
						4155050,
						58.5,
						7097796,
						2942746,
						0.9,
						3665,
						-0.73
					],
					[
						'New Zealand',
						4078993,
						89.4,
						4565185,
						486192,
						2.2,
						86515,
						0.81
					],
					[
						'Ireland',
						3817392,
						81,
						4713993,
						896601,
						1,
						39443,
						0.54
					],
					[
						'Cuba',
						3696765,
						32.4,
						11392889,
						7696124,
						4,
						143221,
						0.03
					],
					[
						'Senegal',
						3647939,
						23.4,
						15589485,
						11941546,
						11.4,
						373533,
						3.04
					],
					[
						'Jordan',
						3536871,
						45.7,
						7747800,
						4210929,
						3.2,
						108475,
						2.02
					],
					[
						'Zimbabwe',
						3356223,
						21,
						15966810,
						12610587,
						4.1,
						130689,
						2.33
					],
					[
						'Oman',
						3310260,
						71.1,
						4654471,
						1344211,
						4.1,
						129032,
						3.65
					],

					[
						'Zambia',
						3167934,
						19,
						16717332,
						13549398,
						5.9,
						176335,
						3.12
					],
					[
						'Paraguay',
						3149519,
						46.8,
						6725430,
						3575911,
						3.9,
						118664,
						1.3
					],
					[
						'Croatia',
						3133485,
						74.2,
						4225001,
						1091516,
						3.6,
						109596,
						-0.36
					],
					[
						'Bosnia and Herzegovina',
						2343255,
						61.6,
						3802134,
						1458879,
						0.2,
						4531,
						-0.22
					],
					[
						'Afghanistan',
						2279167,
						6.8,
						33369945,
						31090778,
						4.7,
						101366,
						2.59
					],
					[
						'Uruguay',
						2238991,
						65,
						3444071,
						1205080,
						2.1,
						45565,
						0.36
					],
					[
						'Mali',
						2212450,
						12.2,
						18134835,
						15922385,
						18.6,
						346882,
						3.04
					],
					[
						'Lithuania',
						2199938,
						77.2,
						2850030,
						650092,
						1.1,
						22897,
						-0.99
					],
					[
						'South Sudan',
						2179963,
						17.1,
						12733427,
						10553464,
						5.5,
						113573,
						3.19
					],
					[
						'Georgia',
						2104906,
						52.9,
						3979781,
						1874875,
						1.9,
						38375,
						-0.5
					],
					[
						'Kyrgyzstan',
						2076220,
						34.4,
						6033769,
						3957549,
						7.5,
						144035,
						1.58
					],
					[
						'Moldova',
						1946111,
						47.9,
						4062862,
						2116751,
						0.7,
						13501,
						-0.15
					],
					[
						'Mozambique',
						1834337,
						6.4,
						28751362,
						26917025,
						5,
						87863,
						2.76
					],
					[
						'Albania',
						1823233,
						62.8,
						2903700,
						1080467,
						1.6,
						28435,
						0.24
					],
					[
						'Panama',
						1803261,
						45.2,
						3990406,
						2187145,
						1.9,
						32996,
						1.56
					],
					[
						'Cambodia',
						1756824,
						11.1,
						15827241,
						14070417,
						7.9,
						128711,
						1.6
					],
					[
						'Tajikistan',
						1622924,
						18.7,
						8669464,
						7046540,
						4.3,
						6723,
						2.21
					],
					[
						'Armenia',
						1510906,
						49.9,
						3026048,
						1515142,
						2.6,
						37831,
						0.28
					],
					[
						'Latvia',
						1491951,
						76.3,
						1955742,
						463791,
						-0.5,
						-6764,
						-0.75
					],
					[
						'Slovenia',
						1490358,
						72,
						2069362,
						579004,
						0.4,
						5776,
						0.09
					],
					[
						'Rwanda',
						1478216,
						12.4,
						11882766,
						10404550,
						7.3,
						100059,
						2.35
					],
					[
						'TFYR Macedonia',
						1439089,
						69.2,
						2081012,
						641923,
						0.9,
						13177,
						0.12
					],
					[
						'Libya',
						1335705,
						21.1,
						6330159,
						4994454,
						9.9,
						1203,
						0.82
					],
					[
						'Haiti',
						1308290,
						12.1,
						10848175,
						9539885,
						3,
						38263,
						1.28
					],
					[
						'Jamaica',
						1216098,
						43.4,
						2803362,
						1587264,
						2.5,
						29091,
						0.36
					],
					[
						'Estonia',
						1196521,
						91.4,
						1309104,
						112583,
						2.2,
						25795,
						-0.26
					],
					[
						'Nicaragua',
						1194337,
						19.4,
						6150035,
						4955698,
						4.1,
						47439,
						1.12
					],
					[
						'Mongolia',
						1069693,
						35.6,
						3006444,
						1936751,
						9.7,
						94869,
						1.6
					],
					[
						'Madagascar',
						1066397,
						4.3,
						24915822,
						23849425,
						7.3,
						72746,
						2.81
					],
					[
						'Papua New Guinea',
						906695,
						11.7,
						7776115,
						6869420,
						8.6,
						71835,
						2.06
					],
					[
						'Cyprus',
						84468,
						71.8,
						1176598,
						331918,
						2,
						16897,
						0.97
					],
					[
						'Turkmenistan',
						789151,
						14.5,
						5438670,
						4649519,
						6.4,
						47737,
						1.21
					],
					[
						'Mauritania',
						714132,
						17.1,
						4166463,
						3452331,
						15.8,
						97605,
						2.43
					],
					[
						'Benin',
						628683,
						5.6,
						11166658,
						10537975,
						4.5,
						27184,
						2.64
					],
					[
						'Niger',
						439164,
						2.1,
						20715285,
						20276121,
						6.7,
						27514,
						4.1
					],
					[
						'Macao',
						433752,
						72.6,
						597126,
						163374,
						2.9,
						12069,
						1.62
					],
					[
						'Liberia',
						395063,
						8.6,
						4615222,
						4220159,
						15.5,
						53123,
						2.48
					],
					[
						'Namibia',
						392181,
						15.6,
						2513981,
						2121800,
						3.8,
						14345,
						2.24
					],
					[
						'Montenegro',
						388057,
						62,
						626101,
						238044,
						0.9,
						3277,
						0.05
					],
					[
						'Chad',
						387063,
						2.7,
						14496739,
						14109676,
						5.5,
						20083,
						3.27
					],
					[
						'Congo',
						357471,
						7.5,
						4740992,
						4383521,
						4.4,
						1506,
						2.61
					],
					[
						'Gambia',
						346471,
						16.9,
						2054986,
						1708515,
						5.7,
						1883,
						3.22
					],
					['Malta', 334056, 79.6, 419615, 85559, 2.8, 9058, 0.23],
					[
						'Bahamas',
						333143,
						84.8,
						392718,
						59575,
						4.2,
						13419,
						1.21
					],
					['Iceland', 331778, 100, 331778, 0, 0.9, 2975, 0.71],
					[
						'Brunei',
						310205,
						72.3,
						428874,
						118669,
						2.9,
						8748,
						1.34
					],
					[
						'Guyana',
						305007,
						39.6,
						77061,
						465603,
						2.2,
						6666,
						0.46
					],
					[
						'Guinea',
						236932,
						1.8,
						12947122,
						12710190,
						4.7,
						10688,
						2.68
					],
					[
						'Barbados',
						228717,
						80.3,
						285006,
						56289,
						1.7,
						3761,
						0.28
					],
					[
						'Central African Republic',
						224432,
						4.5,
						4998493,
						4774061,
						5.3,
						1127,
						2
					],
					[
						'Somalia',
						192775,
						1.7,
						11079013,
						10886238,
						4.6,
						8519,
						2.71
					],
					[
						'Gabon',
						182309,
						10.3,
						1763142,
						1580833,
						3.9,
						678,
						2.19
					],
					[
						'Equatorial Guinea',
						181657,
						20.9,
						869587,
						68793,
						6.1,
						10384,
						2.9
					],

					['Greenland', 37899, 67.4, 56196, 18297, 0.4, 135, 0.02]
				]),
				name: 'Internet Users by Country',
				sample: true,
				createdAt: new Date(),
				updatedAt: new Date()
			}
		],
		{}
	),

	down: queryInterface => queryInterface.bulkDelete('datasets', null)
};
