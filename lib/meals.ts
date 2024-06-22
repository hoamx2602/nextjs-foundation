import { MealItemProps } from "@/components/meals/meal-item";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals(): Promise<MealItemProps[]> {
	await new Promise((resolve) => setTimeout(resolve, 2000));
	// throw new Error("Some thing went wrong!");
	return db.prepare("SELECT * FROM meals").all() as MealItemProps[];
}

export async function getMeal(slug: string): Promise<MealItemProps> {
	return db
		.prepare("SELECT * FROM meals WHERE slug = ?")
		.get(slug) as MealItemProps;
}

export function saveMeal(meal: MealItemProps) {
	meal.slug = slugify(meal.title, { lower: true });
	meal.instructions = xss(meal.instructions);
}
