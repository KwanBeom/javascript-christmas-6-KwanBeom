import { MINIMUM_EVENT_AMOUNT } from '../../constants/amount';
import GIFT from '../../constants/gift';
import Benefit from './Benefit';

class DecemberBenefit extends Benefit {
  #christmasDdayBenefit = 0;

  apply(totalPrice, mainMenuCount, dessertCount) {
    if (totalPrice > MINIMUM_EVENT_AMOUNT) {
      this.#christmasDdayDiscount();
      this.weekdayDiscount(dessertCount);
      this.weekendDiscount(mainMenuCount);
      this.specialDiscount('일', 24);
      this.overAmountGift(totalPrice, GIFT.DECEMBER.MIN_AMOUNT, GIFT.DECEMBER.KEY);
    }
  }

  dDayDiscountPrice() {
    return this.#christmasDdayBenefit;
  }

  #christmasDdayDiscount() {
    const D_DAY_DISCOUNT_AMOUNT = 1000;
    const D_DAY_INCREASE_AMOUNT = 100;
    const CHRISTMAS_NEXT_DATE = 26;

    if (this.visitDate.lessThan(CHRISTMAS_NEXT_DATE)) {
      this.#christmasDdayBenefit = D_DAY_DISCOUNT_AMOUNT + D_DAY_INCREASE_AMOUNT * this.visitDate.getDate();
    }
  }
}

export default DecemberBenefit;
