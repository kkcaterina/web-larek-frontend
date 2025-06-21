import { IApi, IProductItem, IOrderResponse, TOrderInfo } from "../../types/index";

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

  postOrder(orderData: TOrderInfo, total: number, products: IProductItem[]): Promise<IOrderResponse> {
    const order = {};
    const orderInfo = {
      total: total,
      items: products.map(product => product.id)
    };
    Object.assign(order, orderData, orderInfo);
    return this._baseApi.post<IOrderResponse>(`/order`, order).then((response: IOrderResponse) => response);
  }
}