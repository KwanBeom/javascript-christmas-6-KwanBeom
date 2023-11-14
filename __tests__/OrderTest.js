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
    const menu = [
      ['양송이수프', '0'],
      ['제로콜라', '1'],
    ];
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

describe('주문 금액 계산 테스트', () => {
  it.each([
    [
      [
        ['티본스테이크', '1'],
        ['양송이수프', '2'],
        ['제로콜라', '1'],
      ],
      55000 + 6000 * 2 + 3000,
    ],
    [
      [
        ['해산물파스타', '2'],
        ['양송이수프', '2'],
        ['제로콜라', '1'],
        ['아이스크림', '1'],
        ['초코케이크', '1'],
      ],
      35000 * 2 + 6000 * 2 + 3000 + 5000 + 15000,
    ],
  ])('주문을 추가하면 총 주문 금액이 정확하게 계산되어야 한다.', (mockInput, expected) => {
    const order = new Order();

    // Given
    order.addOrder(mockInput);

    // When
    const result = order.totalPrice();

    // Then
    expect(result).toBe(expected);
  });
});

describe('주문된 메뉴의 갯수 계산 테스트', () => {
  // 메인메뉴 : 해산물파스타, 바비큐립, 티본스테이크, 크리스마스파스타
  it.each([
    [
      [
        ['해산물파스타', '2'],
        ['바비큐립', '2'],
        ['티본스테이크', '1'],
        ['크리스마스파스타', '1'],
        ['아이스크림', '1'],
        ['초코케이크', '3'],
        ['제로콜라', '1'],
      ],
      [6, 4],
    ],
    [
      [
        ['해산물파스타', '1'],
        ['바비큐립', '2'],
        ['티본스테이크', '1'],
        ['크리스마스파스타', '5'],
        ['아이스크림', '1'],
        ['초코케이크', '1'],
        ['제로콜라', '1'],
        ['레드와인', '1'],
        ['샴페인', '2'],
      ],
      [9, 2],
    ],
  ])('메인메뉴, 디저트를 n개 주문하면 메뉴의 갯수가 계산되어야 한다.', (mockInput, [mainMenuCount, dessertCount]) => {
    const order = new Order();

    // Given
    order.addOrder(mockInput);

    // When
    const mainMenuResult = order.mainMenuCount();
    const dessertResult = order.dessertCount();

    // Then
    expect(mainMenuResult).toBe(mainMenuCount);
    expect(dessertResult).toBe(dessertCount);
  });
});
