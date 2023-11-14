import { DISCOUNT_AMOUNT } from '../constants/amount';

class DiscountCalculator {
  static discountForCount(count) {
    return count * DISCOUNT_AMOUNT.ONE_MENU;
  }
}

export default DiscountCalculator;
