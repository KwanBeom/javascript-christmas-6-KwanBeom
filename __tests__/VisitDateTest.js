import VisitDate from '../src/models/VisitDate';

describe('방문 날짜 테스트', () => {
  it.each([0, 32, 35, 50, -1])('잘못된 방문일자를 입력하면 에러가 발생한다.', (date) => {
    // when & then
    expect(() => new VisitDate(date)).toThrow('[ERROR]');
  });

  it.each([
    [25, '월', true],
    [26, '화', true],
    [27, '수', true],
    [28, '목', true],
    [29, '금', false],
    [30, '토', false],
    [31, '일', true],
  ])('2023년 12월의 날짜에 따라 올바른 계산을 해야 한다.', (date, expectDayOfWeek, expectWeekday) => {
    // given
    const yearSpy = jest.spyOn(Date.prototype, 'getFullYear').mockImplementation(() => 2023);
    const dateSpy = jest.spyOn(Date.prototype, 'getMonth').mockImplementation(() => 12);
    const visitDate = new VisitDate(date);

    // when & then
    expect(visitDate.dayOfWeek()).toBe(expectDayOfWeek);
    expect(visitDate.isWeekday()).toBe(expectWeekday);
  
    yearSpy.mockRestore();
    dateSpy.mockRestore();
  });
});

