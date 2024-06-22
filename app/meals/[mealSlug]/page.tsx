const MealDetail = ({
  params,
}: {
  params: {
    mealSlug: string;
  };
}) => {
  return <h1>{params.mealSlug}</h1>;
};

export default MealDetail;
