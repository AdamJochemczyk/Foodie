export interface ProductProperties {
  category: string;
  name: string;
  gtincode: string;
  photo?: File | null;
  imgCode: string;
}
export interface UpdateProduct extends ProductProperties {
  productid: string;
  photolink?: string;
}
export interface InsertProduct extends ProductProperties {
  photolink: string;
  proposaluserid: string;
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
  isUserFav?: Array<{ userid: string }>;
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
