import { Console } from '@woowacourse/mission-utils';
import { ERROR_MESSAGE, MESSAGE } from '../constants/message';
import REGEX from '../constants/regex';
import RANGE from '../constants/range';
import InputView from '../views/InputView';
import OutputView from '../views/OutputView';
import VisitDate from '../models/VisitDate';


class BookingController {
  constructor(order, benefit) {
    this.order = order;
    this.benefit = benefit;
  }

  async enterVisitDate() {
    Console.print(MESSAGE.GREETING);

    do {
      try {
        const visitDateInput = await InputView.askVisitDate();
        this.#validateVisitDateInput(visitDateInput);
        this.visitDate = visitDateInput;
      } catch (error) {
        Console.print(error);
      }
    } while (!this.visitDate);
  }

  async orderMenu() {
    do {
      try {
        const menuInput = await InputView.askOrder();
        this.#validateMenuInput(menuInput);
        this.order.addOrder(this.#parseMenuInput(menuInput));
      } catch (error) {
        Console.print(error);
      }
    } while (!this.order.isOrderPlaced());
  }

  applyBenefit() {
    const visitDate = new VisitDate(this.visitDate);
    
    this.benefit.setVisitDate(visitDate);
    this.benefit.apply(
      this.order.totalPrice(),
      this.order.mainMenuCount(),
      this.order.dessertCount(),
    );
  }


  printReceipt() {
    const totalPrice = this.order.totalPrice();
    const orderDetail = this.order.orderDetail();
    
    OutputView.printReceipt(totalPrice, orderDetail, new VisitDate(this.visitDate), this.benefit);
  }

  #validateMenuInput(input) {
    if (!REGEX.MENU_INPUT.test(input)) {
      throw ERROR_MESSAGE.INVALID_ORDER;
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
    const visitDate = Number(input);

    if (visitDate < MONTH_START || visitDate > MONTH_END || Number.isNaN(visitDate)) {
      throw ERROR_MESSAGE.INVALID_DATE;
    }
  }
}

export default BookingController;
