import { ERROR_MESSAGE } from '../constants/message';
import RANGE from '../constants/range';

class VisitDate {
  #visitDate;

  WEEKDAY = ['일', '월', '화', '수', '목'];

  constructor(date) {
    this.#validateDate(date);
    this.#visitDate = Number(date);
  }

  getDate() {
    return this.#visitDate;
  }

  lessThan(date) {
    return this.#visitDate < date;
  }

  overThan(date) {
    return this.#visitDate > date;
  }

  isWeekday() {
    return this.WEEKDAY.includes(this.dayOfWeek());
  }

  isWeekend() {
    return !this.WEEKDAY.includes(this.dayOfWeek());
  }

  dayOfWeek() {
    const date = new Date();
    const year = date.getFullYear();
    const month = 12; // TODO: 실제 서비스 시에는 date.getMonth() + 1로 수정해야 합니다.
    const adjustedMonth = month < 3 ? month + 12 : month;
    const adjustedYear = month < 3 ? year - 1 : year;
  
    const h = (this.#visitDate + Math.floor((13 * (adjustedMonth + 1)) / 5) + (adjustedYear % 100)
        + Math.floor((adjustedYear % 100) / 4) + Math.floor(adjustedYear / 100 / 4) 
        - 2 * Math.floor(adjustedYear / 100)) % 7;
    
    return ['월', '화', '수', '목', '금', '토', '일'][(h + 5) % 7]; // 결과를 0(월요일) ~ 6(일요일)로 맞추기 위해 조정
  }

  #validateDate(date) {
    const [MONTH_START, MONTH_END] = RANGE.MONTH_DATE;

    if (date < MONTH_START || date > MONTH_END) {
      throw new Error(ERROR_MESSAGE.INVALID_DATE);
    }
  }
}

export default VisitDate;
