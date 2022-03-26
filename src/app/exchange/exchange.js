import { htmlToElement } from '@assets/helpers/mixins';
import './exchange.scss';
import customSelect from '../components/custom-select/custom-select';
import model from '../model';
import EventBus from '../event-bus';

let template = `
  <main class="exchange__container">
    <div class="exchange">
      <div id="baseCurrencySection">
        <span>Base currency:</span>
        ${/* baseCurrency Custom Component*/''}            
      </div>
      
      <div>
        Filter:
        <input class="currency-filter" type="text">
      </div>
      
      <ul class="currency-list">
        <li class="currency-list__item">
          <input class="currency-list__bookmark" type="checkbox">
          <div>
            currency name
          </div>
          <div>
            currency rate
          </div>
        </li>
        <li class="currency-list__item">
          <input class="currency-list__bookmark" type="checkbox">
          <div>
            currency name
          </div>
          <div>
            currency rate
          </div>
        </li>
      </ul>
        
    </div>
  </main>
`;

export default function () {
  let exchange = htmlToElement(template);

  let baseCurrencySection = exchange.querySelector('#baseCurrencySection');
  let baseCurrencyCustomSelect = createBaseCurrencyCustomSelect();
  baseCurrencySection.appendChild(baseCurrencyCustomSelect);

  return exchange;
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