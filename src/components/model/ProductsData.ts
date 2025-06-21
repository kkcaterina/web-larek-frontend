import { IProductItem, IProductList } from "../../types";
import { IEvents } from "../base/events";

export class ProductsData implements IProductList {
  protected _items: IProductItem[];
  protected events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
  }

  set items(items: IProductItem[]) {
    this._items = items;
    this.events.emit('products:changed');
  }

  get items(): IProductItem[] {
    return this._items;
  }

  getProduct(id: string): IProductItem | undefined {
    return this._items.find((item) => item.id === id);
  }
}