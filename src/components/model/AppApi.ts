import { IApi, IProductItem, IOrderResponse, IOrderData } from "../../types/index";

export class AppApi {
  private _baseApi: IApi;

  constructor(baseApi: IApi) {
    this._baseApi = baseApi;
  }

  getProducts(): Promise<IProductItem[]> {
    return this._baseApi.get<{ total: number; items: IProductItem[] }>(`/product`).then((productsObject) => productsObject.items);
  }

  getProduct(id: string): Promise<IProductItem> {
    return this._baseApi.get<IProductItem>(`/product/${id}`).then((product: IProductItem) => product);
  }

  postOrder(orderData: IOrderData): Promise<IOrderResponse> {
    return this._baseApi.post<IOrderResponse>(`/order`, orderData).then((response: IOrderResponse) => response);
  }
}