import QUANTITY from './quantity';

export const PROMPT_MESSAGE = Object.freeze({
  ORDER: '주문할 메뉴와 갯수를 알려주세요. (e.g. 해산물파스타-2, 레드와인-2)',
});

export const ERROR_MESSAGE = Object.freeze({
  INVALID_ORDER: '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
  OVER_QUANTITY: `[ERROR] 주문 가능한 최대 수량은 ${QUANTITY.MAXIMUM_ORDER}개 입니다.`,
  ORDERED_ONLY_DRINK: '[ERROR] 음료만 주문할 수 없습니다. 다시 주문해주세요',
});
