import { IProductItem } from "../../types";
import { IEvents } from "../base/events";
import { Component } from "./Component";

export interface IBasketModal {
  items: IProductItem[];
  total: number;
}

export class BasketModal <IBasketModal> extends Component<IBasketModal> {
  protected _productsContainer: HTMLUListElement;
  protected _totalContainer: HTMLSpanElement;
  protected submitButton: HTMLButtonElement;
  protected events: IEvents;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events;
    this._productsContainer = this.container.querySelector('.basket__list');
    this._totalContainer = this.container.querySelector('.basket__price');
    this.submitButton = this.container.querySelector('.basket__button');

    this.submitButton.addEventListener('click', () => {
      this.events.emit('basket:submit');
    });
  }

  set productsContainer(items: HTMLElement[]) {
    this._productsContainer.replaceChildren(...items);
  }

  set totalContainer(total: number) {
    this._totalContainer.textContent = `${total} синапсов`;
    this.changeButtonState(this.submitButton, (total === 0));
  }
}