import InputView from '../views/InputView';
import { ERROR_MESSAGE } from '../constants/message';
import REGEX from '../constants/regex';
import { Console } from '@woowacourse/mission-utils';

class BookingController {
  constructor(visitDate, order) {
    this.visitDate = visitDate;
    this.order = order;
  }

  async orderMenu() {
    if (this.order.isOrderPlaced()) {
      return;
    }

    try {
      const menuInput = await InputView.askOrder();
      this.#validateMenuInput(menuInput);
      this.order.addOrder(this.#parseMenuInput(menuInput));
    } catch (error) {
      Console.print(error);
      this.orderMenu();
    }
  }

  #validateMenuInput(input) {
    if (!REGEX.MENU_INPUT.test(input)) {
      throw new Error(ERROR_MESSAGE.INVALID_ORDER);
    }
  }

  #parseMenuInput(input) {
    return input.split(',')
      .map((value) => {
        const [menu, quantity] = value.split('-');
        return [menu.trim(), quantity.trim()];
      });
  }
}

export default BookingController;
