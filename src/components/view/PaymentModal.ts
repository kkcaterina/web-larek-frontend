import { TPaymentMethod } from "../../types";
import { IEvents } from "../base/events";
import { FormModal } from "./FormModal";

export interface IPaymentModal {
  payment: TPaymentMethod;
  address: string;
}

export class PaymentModal extends FormModal<IPaymentModal> {
  protected addressInput: HTMLInputElement;
  protected onlineButton: HTMLButtonElement;
  protected offlineButton: HTMLButtonElement;
  protected paymentMethod: TPaymentMethod;

  constructor(formElement: HTMLFormElement, events: IEvents) {
    super(formElement, events);

    this.addressInput = formElement.querySelector('input[name="address"]');
    this.onlineButton = formElement.querySelector('button[name="card"]');
    this.offlineButton = formElement.querySelector('button[name="cash"]');

    this.onlineButton.addEventListener('click', () => {
      this.offlineButton.classList.remove('button_alt-active');
      this.onlineButton.classList.add('button_alt-active');
      this.paymentMethod = 'online';
      this.events.emit(`${this.formElement.name}:select`, { value: this.paymentMethod });
    });

    this.offlineButton.addEventListener('click', () => {
      this.onlineButton.classList.remove('button_alt-active');
      this.offlineButton.classList.add('button_alt-active');
      this.paymentMethod = 'offline';
      this.events.emit(`${this.formElement.name}:select`, { value: this.paymentMethod });
    });
  }

  set address(address: string) {
    this.addressInput.value = address;
  }

  set payment(method: TPaymentMethod) {
    this.paymentMethod = method;
  }
}