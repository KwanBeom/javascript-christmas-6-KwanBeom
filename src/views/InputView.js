import { Console } from '@woowacourse/mission-utils';
import { PROMPT_MESSAGE } from '../constants/message';

const InputView = {
  async askOrder() {
    const order = await Console.readLineAsync(PROMPT_MESSAGE.ORDER);
    return order;
  },
  async askVisitDate() {
    const visitDate = await Console.readLineAsync(PROMPT_MESSAGE.VISIT_DATE);
    return visitDate;
  }
};

export default InputView;
