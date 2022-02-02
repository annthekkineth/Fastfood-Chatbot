const Order = require("./assignment1Order");

const OrderState = Object.freeze({
  WELCOMING: Symbol("welcoming"),
  ITEM: Symbol("item"),
  SIZE: Symbol("size"),
  DESSERT: Symbol("dessert"),
  TOPPINGS: Symbol("toppings"),
  DRINKS: Symbol("drinks"),
});

var total= 0;

module.exports = class ShwarmaOrder extends Order {
  constructor() {
    super();
    this.stateCur = OrderState.WELCOMING;
    this.sSize = "";
    this.sToppings = "";
    this.sDrinks = "";
    this.sDesserts = "";
    this.sItem = "";
  }
  handleInput(sInput) {
    let aReturn = [];
    switch (this.stateCur) {
      case OrderState.WELCOMING:
        this.stateCur = OrderState.ITEM;
        aReturn.push("Welcome to Ann's Dinner.");
        aReturn.push("What would you like to order? Burger or Noodles");
        total = 0;
        break;
      case OrderState.ITEM:
        this.stateCur = OrderState.SIZE;
        this.sItem = sInput;
        if(sInput.toLowerCase() == "burger")
            total=total + 7;
        else
            total=total + 9;
        aReturn.push("What size would you like? Large, medium or small");
        break;
      case OrderState.SIZE:
        this.stateCur = OrderState.TOPPINGS;
        this.sSize = sInput;
        if(sInput.toLowerCase() == "large")
            total=total + 2;
        if(sInput.toLowerCase() == "medium")
            total=total + 1;
        aReturn.push("What toppings would you like?");
        break;
      case OrderState.TOPPINGS:
        this.stateCur = OrderState.DESSERT;
        this.sToppings = sInput;
        total=total + 3;
        aReturn.push("Would you like dessert with that?");
        break;
      case OrderState.DESSERT:
        if (sInput.toLowerCase() != "no") {
          this.sDesserts = sInput;
        }
        this.stateCur = OrderState.DRINKS;
        aReturn.push("Would you like drinks with that?");
        break;
      case OrderState.DRINKS:
        this.isDone(true);
        if (sInput.toLowerCase() != "no") {
          this.sDrinks = sInput;
        }
        aReturn.push("Thank-you for your order-");
        aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings}`);
        if (this.sDesserts) {
            total=total + 5;
            aReturn.push(`Dessert: ${this.sDesserts}`);
          }
          if (this.sDrinks) {
            total=total + 5;
            aReturn.push(`Drink: ${this.sDrinks}`);
          }
          aReturn.push(`Your approximate total amount will be: $${total}`);
        let d = new Date();
        d.setMinutes(d.getMinutes() + 20);
        aReturn.push(`Please pick it up at ${d.toTimeString()}`);
        break;
    }
    return aReturn;
  }
};
