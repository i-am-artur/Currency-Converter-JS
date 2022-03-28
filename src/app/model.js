import EventBus from './event-bus';

let alredayStoredcurrencyList = {
  'AED': {
    'code': 'AED',
    'value': 3.67306
  },
  'AFN': {
    'code': 'AFN',
    'value': 91.80254,
    'bookmark': true
  },
  'ALL': {
    'code': 'ALL',
    'value': 108.22904
  },
  'AMD': {
    'code': 'AMD',
    'value': 480.41659,
    'bookmark': true
  }
};

let fetchedCurrencyInfoSimulation = {
  'AED': {
    'code': 'AED',
    'value': 3.67306
  },
  'AFN': {
    'code': 'AFN',
    'value': 91.80254
  },
  'ALL': {
    'code': 'ALL',
    'value': 108.22904
  },
  'AMD': {
    'code': 'AMD',
    'value': 480.41659
  }
};

const model = () => {
  let baseCurrency = 'USD';
  let secondCurrency = 'AED';
  let currenciesList=[];
  console.log(alredayStoredcurrencyList);

  fetchCurrencyData(baseCurrency);

  function fetchCurrencyData(newBaseCurrency){
    // fetch(
    //   `https://api.currencyapi.com/v3/latest?apikey==ae8ab4f0-43cc-11ec-9d80-9f753414f6f7&base_currency=
    //   ${newBaseCurrency}`
    // )
    //   .then((res) => res.json())
    //   .then(fetchedCurrencyInfo => {
        let fetchedCurrencyInfo = fetchedCurrencyInfoSimulation;

        baseCurrency = newBaseCurrency;
        // currenciesList = currencyInfo.data;
        Object.values(currenciesList).forEach(currency => {
          fetchedCurrencyInfo[currency.code].bookmark = currency.bookmark ?? false;
        });

        currenciesList = fetchedCurrencyInfo;
        EventBus.publish(EventBus.eventNames.baseCurrencyChanged);
        EventBus.publish(EventBus.eventNames.currenciesListChanged);
      // });
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