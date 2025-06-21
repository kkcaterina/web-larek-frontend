import { IProductItem } from "../../types";
import { IEvents } from "../base/events";
import { Component } from "./Component";
import { TProductCategory } from "../../types";

export interface IProductItemView extends IProductItem {
  buttonState: boolean;
}

export class ProductItem extends Component<IProductItemView>{
  protected events: IEvents;
  protected productId: string;
  protected productCategory?: HTMLSpanElement;
  protected productTitle: HTMLHeadElement;
  protected productImage?: HTMLImageElement;
  protected productPrice: HTMLSpanElement;
  protected productDescription?: HTMLParagraphElement;
  protected addProductButton?: HTMLButtonElement;
  protected productIndex?: HTMLSpanElement;
  protected deleteProductButton?: HTMLButtonElement;
  
  constructor(protected container: HTMLTemplateElement, events: IEvents) {
    super(container);
    this.events = events;
    this.productTitle = this.container.querySelector('.card__title');
    this.productPrice = this.container.querySelector('.card__price');
  }

  set title (title: string) {
    this.productTitle.textContent = title;
  }

  set price (price: number | null) {
    this.productPrice.textContent = (price ? `${price} синапсов` : `Бесценно`);
  }

  set id (id) {
    this.productId = id;
  }

  get id() {
    return this.productId;
  }

  deleteProduct(): void {
    this.container.remove();
    this.container = null;
  }
}

export const productCategory: Record<TProductCategory, string> = {
  'софт-скил': 'soft',
  'хард-скил': 'hard',
  'другое': 'other',
  'кнопка': 'button',
  'дополнительное': 'additional'
}