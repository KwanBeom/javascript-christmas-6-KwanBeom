import Membership from '../src/models/Membership';

describe('혜택 금액에 따른 뱃지 테스트', () => {
  it.each([
    [6000, '별'],
    [11000, '트리'],
    [30000, '산타'],
    [15000, '트리'],
    [3000, undefined],
  ])('혜택 가격에 따라 알맞는 뱃지가 부여되어야 한다.', (benefitPrice, expected) => {
    // when
    const badge = Membership.badge(benefitPrice);

    // then
    expect(badge).toBe(expected);
  });
});
