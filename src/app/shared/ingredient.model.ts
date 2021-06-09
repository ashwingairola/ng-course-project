export class Ingredient {
	private static nextId = 0;
	public id: number;

	constructor(public name: string, public amount: number) {
		this.id = Ingredient.nextId;
		Ingredient.nextId++;
	}
}
