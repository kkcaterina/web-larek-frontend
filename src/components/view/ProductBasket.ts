import { ProductItem } from "./ProductItem";
import { IEvents } from "../base/events";

export class ProductBasket extends ProductItem {
  constructor(protected container: HTMLTemplateElement, events: IEvents) {
    super(container, events);
    this.productIndex = this.container.querySelector('.basket__item-index');
    this.deleteProductButton = this.container.querySelector('.basket__item-delete');

    this.deleteProductButton.addEventListener('click', () =>
      this.events.emit('product:delete', { productId: this.productId })
    );
  }

  set index (index: number) {
      this.productIndex.textContent = String(index);
    }
}