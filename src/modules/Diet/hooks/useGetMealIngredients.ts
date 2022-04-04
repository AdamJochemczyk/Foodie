export const useGetMealIngredients = ({
  name,
  day
}: {
  name: string;
  day: string;
}) => {
  return { isLoading: false, entities: [], name, day };
};
