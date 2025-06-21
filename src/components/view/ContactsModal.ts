import { IEvents } from "../base/events";
import { FormModal } from "./FormModal";

export interface IContactsModal {
  email: string;
  phone: string;
}

export class ContactsModal extends FormModal<IContactsModal>{
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;

  constructor(formElement: HTMLFormElement, events: IEvents) {
    super(formElement, events);

    this.emailInput = formElement.querySelector('input[name="email"]');
    this.phoneInput = formElement.querySelector('input[name="phone"]');
  }

  set email (email: string) {
    this.emailInput.value = email;
  }

  set phone (phone: string) {
    this.phoneInput.value = phone;
  }
}