import EventBus from './event-bus';

let testingCurrencyList = {
  AED: {code:'AED', value: 4.035167,bookmark: true},
  AFN: {code:'AFN', value: 97.221946, bookmark: false},
  ALL: {code:'ALL', value: 122.109277, bookmark: false},
  AMD: {code:'AMD', value: 538.720347, bookmark: false},
  ANG: {code:'ANG', value: 1.979039, bookmark: false},
  AOA: {code:'AOA', value: 495.079479, bookmark: false},
  ARS: {code:'ARS', value: 121.602327, bookmark: false},
  AUD: {code:'AUD', value: 1.466021, bookmark: false},
  AWG: {code:'AWG', value: 1.977479, bookmark: false},
  AZN: {code:'AZN', value: 1.871522, bookmark: false},
  BAM: {code:'BAM', value: 1.954468, bookmark: false},
  BBD: {code:'BBD', value: 2.217196, bookmark: false},
  BDT: {code:'BDT', value: 94.685347, bookmark: false},
  BGN: {code:'BGN', value: 1.955815, bookmark: false},
  BHD: {code:'BHD', value: 0.414241, bookmark: false}
};

const model = () => {
  let baseCurrency = 'USD';
  let secondCurrency = 'UAH';
  let currenciesList = {};

  fetchCurrencyData(baseCurrency);

  function fetchCurrencyData(newBaseCurrency){
    const apiKey = 'ae8ab4f0-43cc-11ec-9d80-9f753414f6f7';

    fetch(`https://api.currencyapi.com/v3/latest?apikey=${apiKey}&base_currency=${newBaseCurrency}`)
      .then(response => response.json())
      .then(fetchedCurrencyData => {
        if(fetchedCurrencyData.message === 'API rate limit exceeded'){
          processData(newBaseCurrency, testingCurrencyList);
        }else {
          processData(newBaseCurrency, fetchedCurrencyData.data);
        }
      });
  }

  function processData(newBaseCurrency, tmpCurrencyList) {
    Object.values(currenciesList).forEach(currency => {
      tmpCurrencyList[currency.code].bookmark = currency.bookmark;
    });

    baseCurrency = newBaseCurrency;
    currenciesList = tmpCurrencyList;
    EventBus.publish(EventBus.eventNames.baseCurrencyChanged);
    EventBus.publish(EventBus.eventNames.currenciesListChanged);
  }

  return {
    getBaseCurrency() {
      return baseCurrency;
    },
    setBaseCurrency(newCurrency) {
      fetchCurrencyData(newCurrency);
    },
    getSecondCurrency() {
      return secondCurrency;
    },
    setSecondCurrency(newCurrency) {
      secondCurrency = newCurrency;
      EventBus.publish(EventBus.eventNames.secondCurrencyChanged);
    },
    getSecondCurrencyRate() {
      return currenciesList[secondCurrency]?.value ?? 'loading';
    },
    getCurrenciesList() {
      return currenciesList;
    },
    toggleCurrencyBookmark(currencyName) {
      currenciesList[currencyName].bookmark = !currenciesList[currencyName].bookmark;
      EventBus.publish(EventBus.eventNames.currenciesListChanged);
    }
  }
};

export default model();