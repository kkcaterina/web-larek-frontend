import { IEvents } from "../base/events";
import { Component } from "./Component";

export interface ISuccessModal {
  total: number;
}

export class SuccessModal extends Component<ISuccessModal>{
  protected description: HTMLParagraphElement;
  protected title: HTMLHeadingElement;
  protected submitButton: HTMLButtonElement;
  protected events: IEvents;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);

    this.events = events;
    this.description = this.container.querySelector('.order-success__description');
    this.title = this.container.querySelector('.order-success__title');
    this.submitButton = this.container.querySelector('.order-success__close');

    this.submitButton.addEventListener('click', () => {
      this.events.emit('success:submit');
    });
  }

  set total (total: number) {
    this.description.textContent = `Списано ${total} синапсов`;
  }
}