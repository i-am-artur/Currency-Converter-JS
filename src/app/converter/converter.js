import './converter.scss';
import {htmlToElement} from '@assets/helpers/common';
import { round } from '@assets/helpers/common';
import customSelect from '../components/custom-select/custom-select';
import EventBus from '../event-bus';
// import {unsubscribe_in_eventbus_from_all_events} from '../event-bus';

import model from '../model';
import {unsubscribe_functions_from_eventBus} from '@assets/helpers/mixins';

function getTemplate() {
  return `
    <main class="converter__container">
      <div class="converter">
        <div id="baseCurrencySection">
          <span>From (base currency):</span>
          ${/* baseCurrency Custom Component*/''}            
        </div>
        <div id="secondCurrencySection">
          <span>To:</span>   
          ${/* secondCurrency Custom Component*/''}  
        </div>
        <div id="exchange-rate">
          ${/* 1 USD = 30 UAH */''}
          ${getExchangeRateExpression()}
        </div>
        <div>
          <span>Amount:</span>
          <input id="amount_to_convert" type="number" min="0" />
        </div>
        <div>
          Result: <span id="conversion_result">${getConversionResult()}</span>
        </div>
      </div>
    </main>
  `;
}

export default function () {

  let converter = htmlToElement(getTemplate());

  let baseCurrencySection = converter.querySelector('#baseCurrencySection');
  let baseCurrencyCustomSelect = createBaseCurrencyCustomSelect();
  baseCurrencySection.appendChild(baseCurrencyCustomSelect);

  let secondCurrencySection = converter.querySelector('#secondCurrencySection');
  let secondCurrencyCustomSelect = createSecondCurrencyCustomSelect();
  secondCurrencySection.appendChild(secondCurrencyCustomSelect);

  subscribeToEvents(converter);

  return converter;
}

function subscribeToEvents(converter) {

  const input_amount_to_convert = converter.querySelector('#amount_to_convert');
  const html_exchange_rate = converter.querySelector('#exchange-rate');
  const html_conversion_result = converter.querySelector('#conversion_result');

  input_amount_to_convert.addEventListener('keyup', () =>
    updateConversionResult(input_amount_to_convert.value, html_conversion_result));

  EventBus.subscribe(EventBus.eventNames.baseCurrencyChanged, modelChanged);
  EventBus.subscribe(EventBus.eventNames.secondCurrencyChanged, modelChanged);
  function modelChanged() {
    html_exchange_rate.innerText = getExchangeRateExpression();
    updateConversionResult(input_amount_to_convert.value, html_conversion_result);
  }

  let routeChanged = () => unsubscribe_functions_from_eventBus(converter, modelChanged, routeChanged);
  EventBus.subscribe(EventBus.eventNames.routeChanged, routeChanged);
}

function updateConversionResult(amountToConvert, html_conversion_result) {
  html_conversion_result.innerText = getConversionResult(amountToConvert);
}

function getConversionResult(amountToConvert = 0) {
  const NUMBER_OF_DECIMALS = 2;
  const conversionResult = amountToConvert * model.getSecondCurrencyRate();
  const conversionResultRounded = round(conversionResult, NUMBER_OF_DECIMALS).toFixed(NUMBER_OF_DECIMALS);

return `${conversionResultRounded} ${model.getSecondCurrency()}`;
}

function getExchangeRateExpression() {
  return `1 ${model.getBaseCurrency()} = ${model.getSecondCurrencyRate()} ${model.getSecondCurrency()}`
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

function createSecondCurrencyCustomSelect() {
  return customSelect(
    model.getSecondCurrency,
    model.getCurrenciesList,
    model.setSecondCurrency,
    EventBus.eventNames.secondCurrencyChanged,
    EventBus.eventNames.currenciesListChanged
  );
}
