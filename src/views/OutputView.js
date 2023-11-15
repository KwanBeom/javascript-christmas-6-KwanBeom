import { Console } from '@woowacourse/mission-utils';
import GIFT from '../constants/gift';
import MENU from '../constants/menu';
import { TITLE } from '../constants/message';
import Membership from '../models/Membership';
import formatter from '../utils/formatter';

const OutputView = {
  discountDetail(benefit, visitDate) {
    const dDayDiscount = benefit.dDayDiscountPrice();
    const weekDiscount = benefit.weekDiscountPrice();
    const specialDiscount = benefit.specialDiscountPrice();
    const isWeekday = visitDate.isWeekday();
    const discountDetails = [
      dDayDiscount && `크리스마스 디데이 할인: -${formatter.numberFormat(dDayDiscount)}원`,
      specialDiscount && `특별 할인: -${formatter.numberFormat(specialDiscount)}원`,
      weekDiscount && `${isWeekday ? '평일' : '주말'} 할인 : -${formatter.numberFormat(weekDiscount)}원`,
    ].filter(Boolean)
      .join('\n');

    return `${discountDetails.length > 0 ? discountDetails : '없음'}`;
  },

  giftDetail(benefit) {
    const giftData =
      Object.values(MENU)
        .flat()
        .find((menu) => menu.key === GIFT.DECEMBER.KEY) || {};
    const giftEventPrice = benefit.giftEventPrice();

    return `${giftEventPrice ? `${giftData.name} ${giftEventPrice / giftData.price}개` : '없음'}`;
  },

  viewBenefitDetail(benefit, visitDate) {
    const giftDetail = this.giftDetail(benefit);
    const discountDetail = this.discountDetail(benefit, visitDate);
    const benefitAmount = benefit.totalBenefitPrice() + benefit.giftEventPrice();

    return [
      TITLE.GIFT_MENU,
      giftDetail,
      TITLE.BENEFIT_DETAIL,
      discountDetail,
      TITLE.BENEFIT_AMOUNT,
      `${formatter.numberFormat(benefitAmount)}원`,
    ].join('\n');
  },

  viewOrderDetail(totalPrice, orders) {
    return `
      ${TITLE.ORDERED_MENU}
      ${Array.from(orders)
        .map(([menu, quantity]) => `${menu} ${quantity}개`)
        .join('\n')}

      ${TITLE.TOTAL_PRICE}
      ${formatter.numberFormat(totalPrice)}원
    `;
  },

  createRecipt(totalPrice, orders, visitDate, benefit) {
    const orderDetail = this.viewOrderDetail(totalPrice, orders);
    const benefitDetail = this.viewBenefitDetail(benefit, visitDate);
    const badge = Membership.badge(benefit.totalBenefitPrice()) || '없음';
    const payment = formatter.numberFormat(totalPrice - benefit.totalBenefitPrice());
    const receipt = [orderDetail, benefitDetail, TITLE.PAYMENT, payment, TITLE.BADGE, badge];

    return receipt.join('\n')
      .replace(/(\n\s+)/g, '\n');
  },

  printReceipt(totalPrice, orders, visitDate, benefit) {
    const receipt = this.createRecipt(totalPrice, orders, visitDate, benefit);

    Console.print(receipt);
  },
};

export default OutputView;
