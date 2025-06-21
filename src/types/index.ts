export interface IProductItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
  index: number;
}

export interface IBuyer {
  orderId: string;
  payment: TPaymentMethod;
  address: string;
  email: string;
  phone: string;
  clearBuyerData(): void;
  getOrderInfo(): TOrderInfo;
  checkPaymentValidation(): void;
  checkContactsValidation(): void;
}

export interface IBasket {
  items: IProductItem[];
  total: number;
  count: number;
  addItem(item: IProductItem): void;
  removeItem(id: string): void;
  clearBasket(): void;
  checkItem(id: string): boolean;
  getOrderItems(): IProductItem[];
}

export interface IProductList {
  items: IProductItem[];
  getProduct(id: string): IProductItem | undefined;
}

export interface IApi {
  baseUrl: string;
  get<T>(uri: string): Promise<T>;
  post<T>(uri: string, data: object, method?: TApiPostMethods): Promise<T>;
}

export interface IOrderResponse {
  id?: string;
  total?: number;
  error?: string;
}

export type TOrderInfo = Pick<IBuyer, 'payment' | 'address' | 'email' | 'phone'>

export type TPaymentMethod = 'online' | 'offline' | null;

export type TApiPostMethods = 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type TProductCategory = 'софт-скил' | 'хард-скил' | 'другое' | 'кнопка' | 'дополнительное';