/* eslint-disable max-lines-per-function */
import Order from '../src/models/Order';

describe('주문 테스트', () => {
  test('메뉴판에 없는 메뉴를 주문하면 예외가 발생한다.', () => {
    const order = new Order();
    expect(() => {
      order.addOrder([['등갈비스테이크', '1']]);
    }).toThrow('[ERROR]');
  });

  test('제대로 입력한 케이스, 예외가 발생하지 않는다.', () => {
    const order = new Order();
    expect(() => {
      order.addOrder([
        ['티본스테이크', '1'],
        ['양송이수프', '2'],
        ['제로콜라', '1'],
      ]);
    }).not.toThrow('[ERROR]');
  });

  test('주문 수량이 올바르지 않으면 예외가 발생한다.', () => {
    const order = new Order();
    expect(() => {
      order.addOrder([['양송이수프', '0']]);
    }).toThrow('[ERROR]');
  });

  test('중복 메뉴를 주문한 경우 예외가 발생한다.', () => {
    const order = new Order();
    expect(() => {
      order.addOrder([
        ['양송이수프', '1'],
        ['양송이수프', '1'],
      ]);
    }).toThrow('[ERROR]');
  });

  test('메뉴를 20개 이상 주문한 경우 예외가 발생한다.', () => {
    const order = new Order();
    expect(() => {
      order.addOrder([
        ['양송이수프', '10'],
        ['제로콜라', '15'],
      ]);
    }).toThrow('[ERROR]');
  });

  test('음료만 주문한 경우 예외가 발생한다.', () => {
    const order = new Order();
    expect(() => {
      order.addOrder([['제로콜라', '1']]);
    }).toThrow('[ERROR]');
  });
});
