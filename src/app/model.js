import EventBus from './event-bus';

let testingFetchedCurrency = {
  AED: 4.035167,
  AFN: 97.221946,
  ALL: 122.109277,
  AMD: 538.720347,
  ANG: 1.979039,
  AOA: 495.079479,
  ARS: 121.602327,
  AUD: 1.466021,
  AWG: 1.977479,
  AZN: 1.871522,
  BAM: 1.954468,
  BBD: 2.217196,
  BDT: 94.685347,
  BGN: 1.955815,
  BHD: 0.414241
};

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
  let baseCurrency = 'BBD';
  let secondCurrency = 'AZN';
  let currenciesList = testingCurrencyList;

  let fetchedCurrencyInfo = fetchCurrencyData(baseCurrency);

  let tmpCurrencyList = {};
  for(let currency in fetchedCurrencyInfo){
    if(fetchedCurrencyInfo.hasOwnProperty(currency)){
      tmpCurrencyList[currency] = {};
      tmpCurrencyList[currency]['code'] = currency;
      tmpCurrencyList[currency]['value'] = fetchedCurrencyInfo[currency];
      tmpCurrencyList[currency]['bookmark'] = false;
    }
  }

  Object.values(currenciesList).forEach(currency => {
    tmpCurrencyList[currency.code].bookmark = currency.bookmark;
  });

  currenciesList = tmpCurrencyList;
  EventBus.publish(EventBus.eventNames.baseCurrencyChanged);
  EventBus.publish(EventBus.eventNames.currenciesListChanged);

  function fetchCurrencyData(newBaseCurrency){
    baseCurrency = newBaseCurrency;

    return testingFetchedCurrency;
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
      return currenciesList[secondCurrency].value;
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