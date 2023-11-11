import deepFreeze from '../utils/deepFreeze';

const MENU = {
  APPETIZER: [
    {
      name: '양송이수프',
      key: 'MUSHROOM_SOUP',
      price: 6000,
    },
    {
      name: '타파스',
      key: 'TAPAS',
      price: 5500,
    },
    {
      name: '시저샐러드',
      key: 'CAESAR_SALAD',
      price: 8000,
    },
  ],
  MAIN: [
    {
      name: '티본스테이크',
      key: 'TBONE_STEAK',
      price: 55000,
    },
    {
      name: '바비큐립',
      key: 'BABECUE_RIB',
      price: 54000,
    },
    {
      name: '해산물파스타',
      key: 'SEAFOOD_PASTA',
      price: 35000,
    },
    {
      name: '크리스마스파스타',
      key: 'CHRISTMAS_PASTA',
      price: 25000,
    },
  ],
  DESSERT: [
    {
      name: '초코케이크',
      key: 'CHOCO_CAKE',
      price: 15000,
    },
    {
      name: '아이스크림',
      key: 'ICECREAM',
      price: 5000,
    },
  ],
  DRINK: [
    {
      name: '제로콜라',
      key: 'ZERO_COKE',
      price: 3000,
    },
    {
      name: '레드와인',
      key: 'RED_WINE',
      price: 60000,
    },
    {
      name: '샴페인',
      key: 'SHAMPAGNE',
      price: 25000,
    },
  ],
};

deepFreeze(MENU);

export default MENU;
