export class Header {
	constructor(public readonly name: string, public value: string) {}

	toString(): string {
		return `${this.name}: ${this.value}`;
	}
}
