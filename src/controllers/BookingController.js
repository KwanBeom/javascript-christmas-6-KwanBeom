import InputView from '../views/InputView';
import { ERROR_MESSAGE, MESSAGE } from '../constants/message';
import REGEX from '../constants/regex';
import RANGE from '../constants/range';
import { Console } from '@woowacourse/mission-utils';

class BookingController {
  constructor(order, benefit) {
    this.order = order;
    this.benefit = benefit;
  }

  async enterVisitDate() {
    if (this.visitDate) return;

    Console.Print(MESSAGE.GREETING);
    try {
      const visitDateInput = await InputView.askVisitDate();
      this.#validateVisitDateInput(visitDateInput);
      this.visitDate = visitDateInput;
    } catch (error) {
      Console.print(error);
      this.enterVisitDate();
    }
  }

  async orderMenu() {
    if (this.order.isOrderPlaced()) return;

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

  #validateVisitDateInput(input) {
    const [MONTH_START, MONTH_END] = RANGE.MONTH_DATE;

    if (input < MONTH_START || input > MONTH_END || Number.isNaN(Number(input))) {
      throw new Error(ERROR_MESSAGE.INVALID_DATE);
    }
  }
}

export default BookingController;
