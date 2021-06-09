export class Recipe {
	private static nextId = 0;

	public id: number;
	public name: string;
	public description: string;
	public imagePath: string;

	constructor(name: string, description: string, imagePath: string) {
		this.name = name;
		this.description = description;
		this.imagePath = imagePath;
		this.id = Recipe.nextId;
		Recipe.nextId++;
	}
}
