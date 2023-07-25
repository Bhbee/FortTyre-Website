export type Product = {
  _id: string;
  image: {
    url: string;
    public_id: string;
  };
  brand: string;
  size: string;
  price: string;
  countInStock: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type ProductList = {
  products: Product[];
  countProducts: number;
  page: number;
  pages: number;
}
