import { Console } from '@woowacourse/mission-utils';
import GIFT from '../constants/gift';
import MENU from '../constants/menu';
import Membership from '../models/Membership';
import { TITLE } from '../constants/message';

const OutputView = {
  numberFormat(number) {
    return new Intl.NumberFormat().format(number);
  },
  viewOrderDetail(totalPrice, orderDetail) {
    return `
      ${TITLE.ORDERED_MENU}
      ${Array.from(orderDetail)
        .map(([menu, quantity]) => `${menu} ${quantity}개`)
        .join('\n')
      }

      ${TITLE.TOTAL_PRICE}
      ${this.numberFormat(totalPrice)}원
    `;
  },
  benefitDetail(benefit, visitDate) {
    const discountDetails = [
      this.dDayDiscountDetail(benefit.dDayDiscountPrice()),
      this.weekDiscountDetail(benefit.weekDiscountPrice(), visitDate),
      this.specialDiscountDetail(benefit.specialDiscountPrice()),
    ]
      .filter(Boolean)
      .join('\n');

    return `${discountDetails || '없음'}`;
  },
  dDayDiscountDetail(dDayDiscountPrice) {
    if (!dDayDiscountPrice) {
      return null;
    }
    return `크리스마스 디데이 할인: -${this.numberFormat(dDayDiscountPrice)}원`;

  },
  weekDiscountDetail(weekDiscountPrice, visitDate) {
    if (!weekDiscountPrice) {
      return null;
    }

    return `${visitDate.isWeekday() ? '평일' : '주말'} 할인 : -${this.numberFormat(
      weekDiscountPrice,
    )}원`;
  },
  specialDiscountDetail(specialDiscountPrice) {
    if (!specialDiscountPrice) {
      return null;
    }
    return `특별 할인: -${this.numberFormat(specialDiscountPrice)}원`;
  },
  viewBenefits(benefit, visitDate) {
    const giftData = Object.values(MENU)
      .flat()
      .find((menu) => menu.key === GIFT.DECEMBER.KEY) || {};
    const giftEventPrice = benefit.giftEventPrice();

    return `${TITLE.GIFT_MENU}
      ${giftEventPrice ? `${giftData.name} ${giftEventPrice / giftData.price}개` : '없음'} 

      ${TITLE.BENEFIT_DETAIL}
      ${this.benefitDetail(benefit, visitDate)}
      
      ${TITLE.BENEFIT_AMOUNT}
      ${this.numberFormat(benefit.totalBenefitPrice() + benefit.giftEventPrice())}원`;
  },
  createRecipt(totalPrice, orderDetail, visitDate, benefit) {
    return `
      ${this.viewOrderDetail(totalPrice, orderDetail)}

      ${this.viewBenefits(benefit, visitDate)}

      ${TITLE.PAYMENT}
      ${this.numberFormat(totalPrice - benefit.totalBenefitPrice())}원

      ${TITLE.BADGE}
      ${Membership.badge(benefit.totalBenefitPrice()) || '없음'}`.replace(/(\n\s+)/g, '\n');
  },
  printReceipt(totalPrice, orderDetail, visitDate, benefit) {
    const receipt = this.createRecipt(totalPrice, orderDetail, visitDate, benefit);

    Console.print(receipt);
  },
};

export default OutputView;
