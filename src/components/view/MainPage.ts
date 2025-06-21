import { Component } from "./Component";
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";

export interface IMainPage {
  basketCounter: number;
  productItems: HTMLElement[];
}

export class MainPage extends Component<IMainPage> {
  protected events: IEvents;
  protected _basketCounter: HTMLSpanElement;
  protected _productItems: HTMLElement;
  protected basketButton: HTMLButtonElement;
  protected pageWrapper: HTMLDivElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events;
    this._basketCounter = ensureElement<HTMLSpanElement>('.header__basket-counter');
    this._productItems = ensureElement<HTMLElement>('.gallery');
    this.basketButton = ensureElement<HTMLButtonElement>('.header__basket');
    this.pageWrapper = ensureElement<HTMLDivElement>('.page__wrapper');

    this.basketButton.addEventListener('click', () =>
      this.events.emit('basket:open')
    );
  }

  set productItems (items: HTMLElement[]) {
    this._productItems.replaceChildren(...items);
  }

  set basketCounter (value: number) {
    this._basketCounter.textContent = String(value);
  }

  set scrollLock (state: boolean) {
    this.pageWrapper.classList.toggle('page__wrapper_locked', state);
  }
} 