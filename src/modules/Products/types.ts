export interface ProductProperties {
  category: string;
  name: string;
  gtinCode: string;
  photo?: File | null;
}
export interface UpdateProduct extends ProductProperties {
  productId: string;
  photoLink?: string;
}
export interface InsertProduct extends ProductProperties {
  photoLink: string;
  proposalUserId: string;
}
export interface ProductAddEditProperties {
  mode: "add" | "edit";
  initialValues?: ProductProperties;
}
export interface ProductCardProperties {
  photoLink: string;
  name: string;
  category: string;
  productId: string;
  showFavButton?: boolean;
  isUserFav?: boolean;
}
export interface SearchProducts {
  searchName: string;
  category: string;
  favorites: boolean;
  verified: boolean;
}
export interface FetchProducts extends SearchProducts {
  userId: string;
}
