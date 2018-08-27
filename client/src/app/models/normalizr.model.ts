export type SchemeID = number | string;

export type SchemeField<E, A = undefined> = A extends undefined
	? E
	: (state: E, action: A) => E;

export type NormalizedSchemeField<T> = { [id in SchemeID]: T };

export class NormalizedSchemeWithoutAll<T, R = undefined> {
	constructor(public byId: SchemeField<{ [id in SchemeID]: T }, R>) {}
}

export class NormalizedScheme<T, R = undefined> {
	constructor(
		public byId: SchemeField<{ [id in SchemeID]: T }, R>,
		public all: SchemeField<SchemeID[], R>
	) {}
}

export class NormalizedSchemeWithFetching<
	T,
	R = undefined
> extends NormalizedScheme<T, R> {
	constructor(
		public byId: SchemeField<{ [id in SchemeID]: T }, R>,
		public all: SchemeField<SchemeID[], R>,
		public isLoading: SchemeField<boolean, R>
	) {
		super(byId, all);
	}
}

export interface NormalizedActiveEntity<T = SchemeID, R = undefined> {
	active: SchemeField<R, T>;
}
