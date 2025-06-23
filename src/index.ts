import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { BasketData } from './components/model/BasketData';
import { ProductsData } from './components/model/ProductsData';
import { IApi, IBuyer, IOrderData, TPaymentMethod } from './types';
import { Api } from './components/base/api';
import { API_URL, settings } from './utils/constants';
import { AppApi } from './components/model/AppApi';
import { ProductCatalog } from './components/view/ProductCatalog';
import { ProductPreview } from './components/view/ProductPreview';
import { ProductBasket } from './components/view/ProductBasket';
import { cloneTemplate } from './utils/utils';
import { MainPage } from './components/view/MainPage';
import { Modal } from './components/view/Modal';
import { BasketModal } from './components/view/BasketModal';
import { PaymentModal } from './components/view/PaymentModal';
import { BuyerData } from './components/model/BuyerData';
import { IFormModal } from './components/view/FormModal';
import { ContactsModal } from './components/view/ContactsModal';
import { SuccessModal } from './components/view/SuccessModal';

const events = new EventEmitter();
events.onAll((event) => {
    console.log(event.eventName, event.data);
})

const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi);

const catalogTemplate: HTMLTemplateElement = document.querySelector('#card-catalog');
const previewTemplate: HTMLTemplateElement = document.querySelector('#card-preview');
const basketTemplate: HTMLTemplateElement = document.querySelector('#card-basket');

const paymentTemplate: HTMLTemplateElement = document.querySelector('#order');
const contactsTemplate: HTMLTemplateElement = document.querySelector('#contacts');

const basketModalTemplate: HTMLTemplateElement = document.querySelector('#basket');
const successModalTemplate: HTMLTemplateElement = document.querySelector('#success');

const productsData = new ProductsData(events);
const basketData = new BasketData(events);
const buyerData = new BuyerData(events);

const mainPage = new MainPage(document.querySelector('.page__wrapper'), events);
const modal = new Modal(document.querySelector('#modal-container'), events);
const basketModal = new BasketModal(cloneTemplate(basketModalTemplate), events);
const paymentModal = new PaymentModal(cloneTemplate(paymentTemplate), events);
const contactsModal = new ContactsModal(cloneTemplate(contactsTemplate), events);
const successModal = new SuccessModal(cloneTemplate(successModalTemplate), events);

api.getProducts()
.then((items) => {
    productsData.items = items;
})
.catch((err) => {
    console.log(err);
});

events.on('products:changed', () => {
    const productsArray = productsData.items.map((item) => {
    const productsView = new ProductCatalog(cloneTemplate(catalogTemplate), events);
        return productsView.render(item);
    });
    mainPage.render({ basketCounter: basketData.count, productItems: productsArray });
});

events.on('product:select', (data: { productId: string }) => {
    const productData = productsData.getProduct(data.productId);
    modal.content = new ProductPreview(cloneTemplate(previewTemplate), events).render({...productData, buttonState: basketData.checkItem(data.productId)});
    modal.open();
});

events.on('modal:open', (lock: { state: boolean }) => {
    mainPage.scrollLock = lock.state;
});

events.on('modal:close', (lock: { state: boolean }) => {
    mainPage.scrollLock = lock.state;
});

events.on('basket:open', () => {
    modal.content = basketModal.render();
    modal.open();
});

events.on('product:add', (data: { productId: string }) => {
    const productItem = productsData.getProduct(data.productId);
    basketData.addItem(productItem);
    modal.close();
});

events.on('product:delete', (data: { productId: string }) => {
    basketData.removeItem(data.productId);
});

events.on('basket:changed', () => {
    mainPage.basketCounter = basketData.count;
    const productItems = basketData.items.map((item, index) => {
        const product = new ProductBasket(cloneTemplate(basketTemplate), events);
        return product.render({...item, index: index + 1});
    });
    modal.content = basketModal.render({productsContainer: productItems, totalContainer: basketData.total});
});

events.on('basket:submit', () => {
    modal.content = paymentModal.render({ valid: false, error: 'Введите свой адрес и выберите способ оплаты' });
    buyerData.checkPaymentValidation();
});

events.on('payment:validation', (data: Partial<IBuyer> & IFormModal) => {
    paymentModal.render(data);
});

events.on('order:select', (data: { value: TPaymentMethod }) => {
    buyerData.payment = data.value;
    buyerData.checkPaymentValidation();
});

events.on('address:input', (data: { value: string }) => {
    buyerData.address = data.value;
    buyerData.checkPaymentValidation();;
});

events.on('order:submit', () => {
    modal.content = contactsModal.render({ valid: false, error: 'Введите электронную почту и номер телефона' });
    buyerData.checkContactsValidation();
});

events.on('contacts:validation', (data: Partial<IBuyer> & IFormModal) => {
    contactsModal.render(data);
});

events.on('email:input', (data: { value: string }) => {
    buyerData.email = data.value;
    buyerData.checkContactsValidation();
});

events.on('phone:input', (data: { value: string }) => {
    buyerData.phone = data.value;
    buyerData.checkContactsValidation();
});

events.on('contacts:submit', () => {
    const orderData: IOrderData = {...buyerData.getOrderInfo(), total: basketData.total, items: basketData.getOrderItems().map(product => product.id)};
    api.postOrder(orderData)
    .then((data) => {
        basketData.clearBasket();
        successModal.total = data.total;
        modal.content = successModal.render();
    })
    .catch((err) => {
        console.log(err);
    });
});

events.on('success:submit', () => {
    modal.close();
});