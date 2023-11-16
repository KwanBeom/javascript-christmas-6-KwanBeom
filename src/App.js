import BookingController from './controllers/BookingController';
import Order from './models/Order';
import DecemberBenefit from './models/benefits/DecemberBenefit';

class App {
  async run() {
    const order = new Order();
    const decemberBenefit = new DecemberBenefit();
    const controller = new BookingController(order, decemberBenefit);

    await controller.enterVisitDate();
    await controller.orderMenu();
    controller.applyBenefit();
    controller.printReceipt();
  }
}

export default App;
