export interface SearchProducts {
  searchName: string;
  category: string;
  favorites: boolean;
}
export const useSearchProducts = ({
  searchName,
  category,
  favorites
}: SearchProducts) => {
  //TODO: implement it
  return {
    searchName,
    category,
    favorites
  };
};
