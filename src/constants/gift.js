import deepFreeze from '../utils/deepFreeze';

const GIFT = {
  DECEMBER: {
    KEY: 'CHAMPAGNE',
    MIN_AMOUNT: 120000,
  }
};

deepFreeze(GIFT);

export default GIFT;
