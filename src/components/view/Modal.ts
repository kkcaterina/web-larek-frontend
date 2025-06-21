import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Component } from "./Component";

export interface IModal {
  content: HTMLElement;
}

export class Modal extends Component<IModal> {
  protected events: IEvents;
  protected _content: HTMLElement;
  protected closeButton: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events;
    this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
    this._content = ensureElement<HTMLDivElement>('.modal__content', container);
    this.closeButton.addEventListener('click', () => this.close());
    this.container.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }

  open() {
    this.container.classList.add('modal_active');
    this.events.emit('modal:open', { state: true });
  }

  close() {
    this.container.classList.remove('modal_active');
    this.events.emit('modal:close', { state: false });
  }

  set content(content: HTMLElement) {
    this._content.replaceChildren(content);
  }
}