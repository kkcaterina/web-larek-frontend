export abstract class Component<T> {
  constructor(protected readonly container: HTMLElement) {

  }

  render(data?: Partial<T>): HTMLElement {
    Object.assign(this as object, data ?? {});
    return this.container;
  }

  changeButtonState(button: HTMLButtonElement, state: boolean): void {
    if (!button) return;
    state ? button.setAttribute('disabled', 'true') : button.removeAttribute('disabled');
  }
}