import MENU from '../constants/menu';
import QUANTITY from '../constants/quantity';
import { ERROR_MESSAGE } from '../constants/message';

class Order {
  #order = new Map();

  #menuDatas = {};

  constructor() {
    this.#initializeMenuDatas();
  }

  isOrderPlaced() {
    return !!this.#order;
  }

  addOrder(menus) {
    this.#validateOrder(menus);
    menus.forEach(([menu, quantity]) => {
      this.#validateDuplicatedMenu(menu);
      this.#order.set(menu, quantity);
    });
  }

  totalPrice() {
    return Array.from(this.#order)
      .reduce((total, [menu, quantity]) => (
        total + this.#menuDatas[menu].price * quantity
      ), 0);
  }

  mainMenuCount() {
    return this.#calculateCategoryCount('MAIN');
  }
  
  dessertCount() {
    return this.#calculateCategoryCount('DESSERT');
  }

  #calculateCategoryCount(category) {
    return Array.from(this.#order)
      .reduce((count, [menu, quantity]) => (
        count + (this.#menuDatas[menu].category === category) * quantity
      ), 0);
  }

  #initializeMenuDatas() {
    Object.entries(MENU)
      .forEach(([category, categoryMenus]) => {
        categoryMenus.forEach((menuData) => {
          this.#menuDatas[menuData.name] = { category, price: menuData.price };
        });
      });
  }

  #validateDuplicatedMenu(menu) {
    if (this.#order.has(menu)) {
      throw new Error(ERROR_MESSAGE.INVALID_ORDER);
    }
  }

  #validateOrder(menus) {
    this.#validateMenuExist(menus);
    this.#validateQuantity(menus);
    this.#validateOrderedOnlyDrink(menus);
  }

  #validateMenuExist(menus) {
    menus.forEach((menuData) => {
      const menu = menuData[0];
      const isExistsMenu = Object.prototype.hasOwnProperty.call(this.#menuDatas, menu);

      if (!isExistsMenu) throw new Error(ERROR_MESSAGE.INVALID_ORDER);
    });
  }

  #validateQuantity(menus) {
    const quantities = menus.map(order => {
      const quantity = Number(order[1]);
      if(quantity < QUANTITY.MINIMUM_ORDER) throw new Error(ERROR_MESSAGE.INVALID_ORDER);
      return quantity;
    });

    const totalQuantity = quantities.reduce((total, quantity) => total + quantity, 0);

    if (totalQuantity > QUANTITY.MAXIMUM_ORDER) throw new Error(ERROR_MESSAGE.OVER_QUANTITY);
  }

  #validateOrderedOnlyDrink(menus) {
    const orderCategory = new Set();
    const CATEGORY_DRINK = 'DRINK';

    menus.forEach((order) => {
      const menu = order[0];
      const category = this.#findCategory(menu);

      if (category) {
        orderCategory.add(category);
      }  
    });

    if (orderCategory.size === 1 && orderCategory.has(CATEGORY_DRINK)) throw new Error(ERROR_MESSAGE.ORDERED_ONLY_DRINK);
  }

  #findCategory(menu) {
    const menuData = this.#menuDatas[menu];

    if (menuData) {
      return menuData.category;
    }
  }
}

export default Order;
