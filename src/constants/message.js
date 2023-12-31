import QUANTITY from './quantity';

export const PROMPT_MESSAGE = Object.freeze({
  ORDER: '주문할 메뉴와 갯수를 알려주세요. (e.g. 해산물파스타-2, 레드와인-2)',
  VISIT_DATE: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)',
});

export const MESSAGE = Object.freeze({
  GREETING: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
});

const ERROR_PREFIX = '[ERROR]';

export const ERROR_MESSAGE = Object.freeze({
  INVALID_ORDER: `${ERROR_PREFIX} 유효하지 않은 주문입니다. 다시 입력해 주세요.`,
  OVER_QUANTITY: `${ERROR_PREFIX} 주문 가능한 최대 수량은 ${QUANTITY.MAXIMUM_ORDER}개 입니다.`,
  ORDERED_ONLY_DRINK: `${ERROR_PREFIX} 음료만 주문할 수 없습니다. 다시 주문해주세요`,
  INVALID_DATE: `${ERROR_PREFIX} 유효하지 않은 날짜입니다. 다시 입력해 주세요.`
});

const TITLE_OPEN_BRACKET = '<';
const TITLE_CLOSE_BRACKET = '>';

export const TITLE = Object.freeze({
  ORDERED_MENU: `${TITLE_OPEN_BRACKET}주문 메뉴${TITLE_CLOSE_BRACKET}`,
  GIFT_MENU: `${TITLE_OPEN_BRACKET}증정 메뉴${TITLE_CLOSE_BRACKET}`,
  TOTAL_PRICE: `${TITLE_OPEN_BRACKET}할인 전 총주문 금액${TITLE_CLOSE_BRACKET}`,
  BENEFIT_DETAIL: `${TITLE_OPEN_BRACKET}혜택 내역${TITLE_CLOSE_BRACKET}`,
  BENEFIT_AMOUNT: `${TITLE_OPEN_BRACKET}총혜택 금액${TITLE_CLOSE_BRACKET}`,
  PAYMENT: `${TITLE_OPEN_BRACKET}할인 후 예상 결제 금액${TITLE_CLOSE_BRACKET}`,
  BADGE: `${TITLE_OPEN_BRACKET}12월 이벤트 배지${TITLE_CLOSE_BRACKET}`,
});
