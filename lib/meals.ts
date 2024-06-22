import { MealItemProps } from "@/components/meals/meal-item";
import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals(): Promise<MealItemProps[]> {
	await new Promise((resolve) => setTimeout(resolve, 2000));
	// throw new Error("Some thing went wrong!");
	return  db.prepare("SELECT * FROM meals").all() as MealItemProps[];
}
