import Order from '../src/models/Order';

describe('메뉴 주문 시', () => {
  it('메뉴판에 없는 메뉴를 주문하면 예외가 발생한다.', () => {
    const order = new Order();

    // Given
    const menu = [['등갈비스테이크', '1']];

    // When & Then
    expect(() => order.addOrder(menu)).toThrow('[ERROR]');
  });

  it('제대로 입력한 케이스, 예외가 발생하지 않는다.', () => {
    const order = new Order();
    const menu = [
      ['티본스테이크', '1'],
      ['양송이수프', '2'],
      ['제로콜라', '1'],
    ];
    expect(() => order.addOrder(menu)).not.toThrow('[ERROR]');
  });

  it('주문 수량이 올바르지 않으면 예외가 발생한다.', () => {
    const order = new Order();
    const menu = [['양송이수프', '0']];
    expect(() => order.addOrder(menu)).toThrow('[ERROR]');
  });

  it('중복 메뉴를 주문한 경우 예외가 발생한다.', () => {
    const order = new Order();
    const menu = [
      ['양송이수프', '1'],
      ['양송이수프', '1'],
    ];
    expect(() => order.addOrder(menu)).toThrow('[ERROR]');
  });

  it('메뉴를 20개 이상 주문한 경우 예외가 발생한다.', () => {
    const order = new Order();
    const menu = [
      ['양송이수프', '10'],
      ['제로콜라', '15'],
    ];
    expect(() => order.addOrder(menu)).toThrow('[ERROR]');
  });

  it('음료만 주문한 경우 예외가 발생한다.', () => {
    const order = new Order();
    const menu = [['제로콜라', '1']];
    expect(() => order.addOrder(menu)).toThrow('[ERROR]');
  });
});