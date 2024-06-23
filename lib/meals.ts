import fs from "node:fs";
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

export async function saveMeal(meal: any) {
	meal.slug = slugify(meal.title, { lower: true });
	meal.instructions = xss(meal.instructions);

	const extension = meal.image.name.split(".").pop();
	const fileName = `${meal.slug}-${Math.random()}.${extension}`;

	const stream = fs.createWriteStream(`public/images/${fileName}`);
	const bufferedImage = await meal.image.arrayBuffer();
	stream.write(Buffer.from(bufferedImage), (error) => {
		if (error) {
			throw new Error("Saving image failed!");
		}
	});

	meal.image = `/images/${fileName}`;

	db.prepare(
		`
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
	).run(meal);
	await new Promise((resolve) => setTimeout(resolve, 2000));
}
