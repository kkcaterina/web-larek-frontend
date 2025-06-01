export interface IProductItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IBuyer {
  payment: string;
  address: string;
  email: string;
  phone: number;
  getPaymentInfo(): TPaymentInfo;
  getContactsInfo(): TContactsInfo;
  clearPaymentInfo(paymentData: TPaymentInfo): void;
  clearContactsInfo(contactsData: TContactsInfo): void;
  checkPaymentValidation(data: Record<keyof TPaymentInfo, string>): boolean;
  checkContactsValidation(data: Record<keyof TContactsInfo, string | number>): boolean;
}

export interface IProductList {
  total: number;
  items: IProductItem[];
  preview: string | null;
  setItems(items: IProductItem[]): void;
  getProduct(id: string): IProductItem;
}

export type TProductItemInfo = Pick<IProductItem, 'description' | 'image' | 'title' | 'category' | 'price'>;

export type TBasketItemInfo = Pick<IProductItem, 'title' | 'price'>;

export type TPaymentInfo = Pick<IBuyer, 'payment' | 'address'>;

export type TContactsInfo = Pick<IBuyer, 'email' | 'phone'>;