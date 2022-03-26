import EventBus from './event-bus';

const model = {
  baseCurrency: 'USD',
  secondCurrency: 'UAH',
  currenciesList: {
    BGN: 1.661,
    CZK: 21.517,
    DKK: 6.305,
    UAH: 30.00
  },
  getBaseCurrency() {
      return model.baseCurrency;
  },
  setBaseCurrency(newCurrency) {
    model.baseCurrency = newCurrency;
    EventBus.publish(EventBus.eventNames.baseCurrencyChanged);
    model.setCurrenciesList(model.currenciesList);

    //  async setBaseCurrency(newCurrency)
    //  await currencisList = load of currency
    //  sort currencisList (bookmarkedFirst = false)
    //  publish event : baseCurrencyChanged
    //  publish event : listChanged
    // ковалевка
    // басфор
    // атб
    // камуфляж
    // британка,
  },
  getSecondCurrency() {
    return model.secondCurrency;
  },
  setSecondCurrency(newCurrency) {
    model.secondCurrency = newCurrency;
    EventBus.publish(EventBus.eventNames.secondCurrencyChanged);
  },
  getSecondCurrencyRate() {
    return model.getCurrenciesList()[model.getSecondCurrency()];
  },
  getCurrenciesList() {
    return model.currenciesList;
  },
  setCurrenciesList(newCurrenciesList) {
    newCurrenciesList = {
      EUR: 1.661,
      CZK: 21.517,
      DKK: 6.305,
      UAH: 30.00
    };
    model.currenciesList = newCurrenciesList;
    EventBus.publish(EventBus.eventNames.currenciesListChanged);
  }
};

// loadCurrenciesData (baseCurrency)
// fetch (address)
// setBaseCurrency
// setSecondCurrency

export default model;
