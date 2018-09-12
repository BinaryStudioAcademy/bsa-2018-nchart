export class WorldMapChartCustomize {
	constructor(
		public width: number = null,
		public height: number = null,
		public rotate: number = null,
		public scale: number = null,
		public showRaticule: boolean = null,
		public chooseProjection: string = null,
		public chooseRegion: string = null,
		public colourScale: number[] = null
	) {}
}
