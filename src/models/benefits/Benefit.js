import { DISCOUNT_AMOUNT } from '../../constants/amount';
import BENEFIT_TYPE from '../../constants/benefitType';
import MENU from '../../constants/menu';
import { ERROR_MESSAGE } from '../../constants/message';
import RANGE from '../../constants/range';
import DiscountCalculator from '../DiscountCalculator';
import VisitDate from '../VisitDate';

class Benefit {
  #benefits = {};

  setVisitDate(date) {
    const [EVENT_START, EVENT_END] = RANGE.EVENT_DATE;

    if(date < EVENT_START || date > EVENT_END) {
      throw new Error(ERROR_MESSAGE.INVALID_DATE);
    }

    this.visitDate = new VisitDate(date);
  }

  totalBenefitPrice() {
    return Object.values(this.#benefits)
      .reduce((total, price) => total + price, 0);
  }

  weekDiscountPrice() {
    return this.#benefits[BENEFIT_TYPE.WEEKDAY_DISCOUNT] 
      || this.#benefits[BENEFIT_TYPE.WEEKEND_DISCOUNT] 
      || 0;
  }

  specialDiscountPrice() {
    return this.#benefits[BENEFIT_TYPE.SPEICAL_DISCOUNT];
  }

  giftEventPrice() {
    return this.#benefits[BENEFIT_TYPE.GIFT] || 0;
  }

  weekdayDiscount(count) {
    if (this.visitDate.isWeekday()) {
      this.#benefits[BENEFIT_TYPE.WEEKDAY_DISCOUNT] = DiscountCalculator.discountForCount(count);
    }
  }

  weekendDiscount(count) {
    if (this.visitDate.isWeekend()) {
      this.#benefits[BENEFIT_TYPE.WEEKEND_DISCOUNT] = DiscountCalculator.discountForCount(count);
    }
  }

  specialDiscount(specialDay, ...specialDates) {
    if (this.visitDate.dayOfWeek() === specialDay || specialDates.includes(this.visitDate)) {
      this.#benefits[BENEFIT_TYPE.SPEICAL_DISCOUNT] = DISCOUNT_AMOUNT.SPECIAL;
    }
  }

  overAmountGift(totalPrice, giftAmount, giftKey) {
    if (giftAmount <= totalPrice) {
      const { price } = MENU.DRINK.find((menuData) => menuData.key === giftKey);
      this.#benefits[BENEFIT_TYPE.GIFT] = price;
    }
  }
}

export default Benefit;

