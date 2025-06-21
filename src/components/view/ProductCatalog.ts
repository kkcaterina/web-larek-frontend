import { ProductItem } from "./ProductItem";
import { IEvents } from "../base/events";
import { CDN_URL } from '../../utils/constants';
import { productCategory } from "./ProductItem";
import { TProductCategory } from "../../types";

export class ProductCatalog extends ProductItem {
  constructor(protected container: HTMLTemplateElement, events: IEvents) {
    super(container, events);
    this.productImage = this.container.querySelector('.card__image');
    this.productCategory = this.container.querySelector('.card__category');

    this.container.addEventListener('click', () =>
      this.events.emit('product:select', { productId: this.id })
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
}