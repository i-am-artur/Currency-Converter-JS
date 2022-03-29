import './exchange.scss';
import {copyObjectWithJSON, htmlToElement} from '@assets/helpers/common';
import customSelect from '../components/custom-select/custom-select';
import model from '../model';
import EventBus from '../event-bus';
import {unsubscribe_functions_from_eventBus} from '@assets/helpers/mixins';

function getTemplate() {
  return `
    <main class="exchange__container">
      <div class="exchange">
        <div id="baseCurrencySection">
          <span>Base currency:</span>
          ${/* baseCurrency Custom Component*/''}            
        </div>
        
        <div>
          Filter:
          <input id="currency-filter" type="text">
        </div>
        <ul class="currency-list">
          ${createList()}
        </ul>
          
      </div>
    </main>
  `;
}

export default function () {
  let exchange = htmlToElement(getTemplate());

  let baseCurrencySection = exchange.querySelector('#baseCurrencySection');
  let baseCurrencyCustomSelect = createBaseCurrencyCustomSelect();
  baseCurrencySection.appendChild(baseCurrencyCustomSelect);

  let currencyListHtml = exchange.querySelector('.currency-list');
  currencyListHtml.addEventListener('change', (event) => toggleCurrencyBookmark(event));

  let currencyFilter = exchange.querySelector('#currency-filter');
  currencyFilter.addEventListener('keyup', () => {
    currencyFilter.value = currencyFilter.value.toUpperCase();
    currencyListHtml.innerHTML = getUpdatedCurrencyList(currencyFilter);
  });

  EventBus.subscribe(EventBus.eventNames.currenciesListChanged, listChanged);
  function listChanged() {
    currencyListHtml.innerHTML = getUpdatedCurrencyList(currencyFilter);
  }

  let routeChanged = () => unsubscribe_functions_from_eventBus(exchange, listChanged, routeChanged);
  EventBus.subscribe(EventBus.eventNames.routeChanged, routeChanged);

  return exchange;
}

function getUpdatedCurrencyList(currencyFilter) {
  let filteredCurrencyList = getFilterCurrencyList(currencyFilter);
  return createList(filteredCurrencyList);
}

function getFilterCurrencyList(currencyFilter) {
  let currencyList = copyObjectWithJSON(model.getCurrenciesList());
  let currencyListKeys = Object.keys(currencyList);

  currencyListKeys.forEach(key => {
    if(currencyFilter && !key.includes(currencyFilter.value)) {
      delete currencyList[key];
    }
  });

  return currencyList;
}

function toggleCurrencyBookmark(event) {
  let target = event.target;
  if(target.className.includes('currency-list__bookmark')){
    model.toggleCurrencyBookmark(target.dataset.currencyName);
  }
}

function createList(currencyListArg = model.getCurrenciesList()) {

  let currencyListSorted = sortCurrencyList(currencyListArg);

  let listHtml = '';
  for (const currency of currencyListSorted) {
    let checked = currency.bookmark ? 'checked' : '';
    listHtml += `
      <li class="currency-list__item">
        <input class="currency-list__bookmark" type="checkbox" ${checked} data-currency-name="${currency.code}">
        <div class="currency-list__currency">
          ${currency.code}
        </div>
        <div>
          ${currency.value}
        </div>
      </li>
    `;
  }

  return listHtml;
}

function sortCurrencyList(currencyListArg) {
  const currencyToTopOfList = -1;
  let currencyList = Object.values(currencyListArg);

  currencyList.sort((currency1, currency2) => {
    if(currency1.bookmark && currency2.bookmark){
      return 0;
    }else if(currency1.bookmark) {
      return currencyToTopOfList;
    }
    return 1;
  });

  return currencyList;
}

function createBaseCurrencyCustomSelect() {
  return customSelect(
    model.getBaseCurrency,
    model.getCurrenciesList,
    model.setBaseCurrency,
    EventBus.eventNames.baseCurrencyChanged,
    EventBus.eventNames.currenciesListChanged
  );
}