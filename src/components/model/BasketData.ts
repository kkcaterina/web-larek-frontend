import { IBasket, IProductItem } from "../../types";
import { IEvents } from "../base/events";

export class BasketData implements IBasket {
  protected _items: IProductItem[];
  protected _total: number;
  protected _count: number;
  protected events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
    this._items = [];
  }

  get items(): IProductItem[] {
    return this._items;
  }

  get total(): number {
    return this._items.reduce((sum, item) => {
      return item.price + sum;
    }, 0);
  }

  get count(): number {
    return this._items.length;
  }

  getOrderItems(): IProductItem[] {
    const orderItems: IProductItem[]  = [];
    this._items.map((item) => {
      if (item.price !== null) {
        orderItems.push(item);
      }
      return orderItems;
  });
    return orderItems;
  }

  checkItem(id: string): boolean {
    const productItem = this._items.find((item) => item.id === id);
    return Boolean(productItem);
  }

  addItem(item: IProductItem): void {
    if (!this.checkItem(item.id)) {
      this._items.push(item);
    }
  }

  removeItem(id: string): void {
    this._items = this._items.filter((item) => item.id !== id);
  }

  clearBasket(): void {
    this._items = [];
  }
}