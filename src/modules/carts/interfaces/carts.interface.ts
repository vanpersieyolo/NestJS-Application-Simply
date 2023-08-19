export interface ICartItem {
  product_id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface ICartInfo {
  items: ICartItem[];
}
