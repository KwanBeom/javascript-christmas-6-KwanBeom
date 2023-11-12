import MENU from '../constants/menu';
import { ERROR_MESSAGE } from '../constants/message';
import QUANTITY from '../constants/quantity';

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
      this.#validateDuplicateMenu(menu);
      this.#order.set(menu, quantity);
    });
  }

  totalPrice() {
    return Array.from(this.#order)
      .reduce((total, [menu, quantity]) => (
        total + this.#menuDatas[menu].price * quantity
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

  #validateDuplicateMenu(menu) {
    if (this.#order.has(menu)) {
      throw new Error(ERROR_MESSAGE.INVALID_ORDER);
    }
  }

  #validateOrder(menus) {
    this.#validateQuantity(menus);
    this.#validateOnlyDrink(menus);

    menus.forEach(([menu, quantity]) => {
      const isExistsMenu = Object.values(MENU)
        .some((category) => (
          category.some((menuData) => menuData.name === menu)
        ));

      if (!isExistsMenu || quantity < 1) throw new Error(ERROR_MESSAGE.INVALID_ORDER);
    });
  }

  #validateQuantity(menus) {
    const totalQuantity = menus.reduce((total, menu) => (
      (typeof total === 'object' ? Number(total[1]) : total) + Number(menu[1])
    ));

    if (totalQuantity > QUANTITY.MAXIMUM_ORDER) throw new Error(ERROR_MESSAGE.OVER_QUANTITY);
  }

  #validateOnlyDrink(menus) {
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
    const menuCategory = Object.entries(MENU)
      .find((category) => {
        const categoryMenus = category[1];
        return categoryMenus.some((menuData) => menuData.name === menu);
      });

    if (menuCategory) {
      return menuCategory[0];
    }
  }
}

export default Order;
