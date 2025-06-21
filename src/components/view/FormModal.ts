import { ensureAllElements, ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Component } from "./Component";

export interface IFormModal {
  valid: boolean;
  error: string;
}

export class FormModal<T> extends Component<IFormModal> {
  protected submitButton: HTMLButtonElement;
  protected _error: HTMLSpanElement;
  protected inputs: HTMLInputElement[];
  protected events: IEvents;

  constructor(protected formElement: HTMLFormElement, events: IEvents) {
    super(formElement);
    this.events = events;
    this.inputs = ensureAllElements<HTMLInputElement>('.form__input', formElement);
    this.submitButton = ensureElement<HTMLButtonElement>('button[type=submit]', formElement);
    this._error = ensureElement<HTMLSpanElement>('.form__errors', formElement);

    this.formElement.addEventListener('input', (evt) => {
      const input = evt.target as HTMLInputElement;
      this.events.emit(`${input.name}:input`, { value: input.value });
    });

    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.events.emit(`${this.formElement.name}:submit`);
    });
  }

  set valid (value: boolean) {
		this.changeButtonState(this.submitButton, !value);
	}

	get valid (): boolean {
		return this.inputs.every((item) => item.value.length > 0);
	}

	set error (value: string) {
		this._error.textContent = value;
	}

	clear(): void {
		this.formElement.reset();
	}

	render(data?: Partial<T> & IFormModal): HTMLElement {
		const { valid, ...inputs } = data;
		super.render({ valid });
		Object.assign(this, inputs);
		return this.formElement;
	}
}