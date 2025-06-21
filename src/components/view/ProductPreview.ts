import { ProductItem } from "./ProductItem";
import { IEvents } from "../base/events";
import { CDN_URL } from '../../utils/constants';
import { TProductCategory } from "../../types";
import { productCategory } from "./ProductItem";

export class ProductPreview extends ProductItem {
  constructor(protected container: HTMLTemplateElement, events: IEvents) {
    super(container, events);
    this.productImage = this.container.querySelector('.card__image');
    this.productCategory = this.container.querySelector('.card__category');
    this.productDescription = this.container.querySelector('.card__text');
    this.addProductButton = this.container.querySelector('.card__button');

    this.addProductButton.addEventListener('click', () =>
      this.events.emit('product:add', { productId: this.id })
    );
  }

  set image (image: string) {
    this.productImage.src = CDN_URL + image;
  }

  set category (category: TProductCategory) {
    this.productCategory.textContent = category;
    this.productCategory.className = 'card__category';
    this.productCategory.classList.add(`card__category_${productCategory[category]}`);
  }

  set description (description: string) {
    this.productDescription.textContent = description;
  }

  set buttonState (state: boolean) {
    this.changeButtonState(this.addProductButton, state);
  }
}