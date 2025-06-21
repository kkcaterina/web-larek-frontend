import { IBuyer, TPaymentMethod, TOrderInfo } from "../../types";
import { IEvents } from "../base/events";

export class BuyerData implements IBuyer {
  protected _orderId: string;
  protected _payment: TPaymentMethod;
  protected _address: string;
  protected _email: string;
  protected _phone: string;
  protected events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
    this.clearBuyerData();
  }

  set orderId(id: string) {
    this._orderId = id;
  }

  get payment(): TPaymentMethod {
    return this._payment;
  }
  
  set payment(payment: TPaymentMethod) {
    this._payment = payment;
  }

  get address(): string {
    return this._address;
  }

  set address(address: string) {
    this._address = address;
  }

  get email(): string {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  get phone(): string {
    return this._phone;
  }

  set phone(phone: string) {
    this._phone = phone;
  }

  clearBuyerData() {
    this._payment = null;
    this._address = '';
    this._email = '';
    this._phone = '';
  }

  getOrderInfo(): TOrderInfo {
    return {
      payment: this._payment,
      address: this._address,
      email: this._email,
      phone: this._phone,
    }
  }

  checkPaymentValidation(): void {
    let valid = true;
    let error = '';
    if (!this._payment || !this._address) {
      error = 'Необходимо указать способ оплаты и адрес доставки';
      valid = false;
    }
      this.events.emit('payment:validation', { payment: this._payment, address: this.address, valid: valid, error: error }
    );
  }

  checkContactsValidation(): void {
    let valid = true;
    let error = '';
    if (!this._email || !this._phone) {
      error = 'Необходимо указать адрес электронной почты и номер телефона';
      valid = false;
    }
      this.events.emit('contacts:validation', { email: this._email, phone: this._phone, valid: valid, error: error }
    );
  }
}