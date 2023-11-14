import DecemberBenefit from '../src/models/benefits/DecemberBenefit';

describe('12월 이벤트 테스트', () => {
  // Given
  const given = {
    total: 56000,
    mainMenu: 5,
    dessertMenu: 3,
  };

  const testBenefit = (visitDate, expected) => {
    const decemberBenefit = new DecemberBenefit();
    decemberBenefit.setVisitDate(visitDate);
    // when
    decemberBenefit.apply(given.total, given.mainMenu, given.dessertMenu);

    // then
    const benefitPrice = decemberBenefit.totalBenefitPrice();

    expect(benefitPrice).toBe(expected);
  };

  const weekdayDiscount = 2023 * given.dessertMenu; // 평일 할인 : 디저트 * 2,023원
  const weekendDiscount = 2023 * given.mainMenu; // 주말 할인 : 메인 메뉴 * 2,023원
  const specialDiscount = 1000; // 스페셜 할인 : 1,000원
  const giftPrice = 25000; // 증정 메뉴 가격

  it.each([0, 32, 35, 50, -1])('잘못된 방문일자를 입력하면 에러가 발생한다.', (visitDate) => {
    const decemberBenefit = new DecemberBenefit();

    // when & then
    expect(() => decemberBenefit.setVisitDate(visitDate)).toThrow('[ERROR]');
  });

  test('주말 할인 테스트', () => {
    testBenefit(29, weekendDiscount); 
  });

  test('평일 할인 테스트', () => {
    testBenefit(28, weekdayDiscount); 
  });

  test('평일 + 특별 할인 테스트', () => {
    testBenefit(31, weekdayDiscount + specialDiscount); 
  });

  test('샴페인 증정 테스트', () => {
    given.total = 120000;
    const decemberBenefit = new DecemberBenefit();
    decemberBenefit.setVisitDate(31);

    // when
    decemberBenefit.apply(given.total, 0, 0);

    // then
    expect(decemberBenefit.giftEventPrice()).toBe(giftPrice);
  });

  it('만원 이하 주문 시 할인 이벤트에 참여할 수 없어야한다.', () => {
    given.total = 9000;
    testBenefit(1, 0);
  });

  test('디데이 할인 테스트', () => {
    const visitDate = 11;
    given.total = 55000;
    const decemberBenefit = new DecemberBenefit();
    decemberBenefit.setVisitDate(visitDate);

    // when
    decemberBenefit.apply(given.total, 0, 0);
    const dDayDiscountPrice = decemberBenefit.dDayDiscountPrice();

    // then
    const expected = 1000 + 100 * visitDate;

    expect(dDayDiscountPrice).toBe(expected);
  });
});
