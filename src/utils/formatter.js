const formatter = {
  numberFormatter: new Intl.NumberFormat(),

  numberFormat(number) {
    return this.numberFormatter.format(number);
  }
};

export default formatter;
