import {htmlToElement} from '@assets/helpers/mixins';
import {unsubscribe_in_eventbus_from_all_events} from '../../event-bus';
import EventBus from '../../event-bus';

CustomSelect.id = 0;

function getTemplate(selectedValueCallback, listCallback){
  return `
    <div class="custom-select">
      <input
        class="custom-select__input"
        list="custom-select-${CustomSelect.id}"
        value="${selectedValueCallback()}"
      >
      <datalist id="custom-select-${CustomSelect.id++}">
        ${reduceListOptions(listCallback)}
      </datalist>
    </div>
  `;
}

export default function CustomSelect(
  getSelectedValueCallback,
  getListCallback,
  setNewValueCallback,
  eventSelectedValueChangedStr,
  eventListChangedStr) {

  let customSelect = htmlToElement(getTemplate(getSelectedValueCallback, getListCallback));
  let input = customSelect.querySelector('.custom-select__input');

  addEventListeners(input, setNewValueCallback, getSelectedValueCallback);

  EventBus.subscribe(eventSelectedValueChangedStr, selectedValueChanged);
  function selectedValueChanged() {
    input.list.innerHTML = reduceListOptions(getListCallback);
  }

  EventBus.subscribe(eventListChangedStr, listChanged);
  function listChanged() {
    input.value = getSelectedValueCallback();
  }

  EventBus.subscribe(EventBus.eventNames.routeChanged, routeChanged);
  function routeChanged() {
    if (!customSelect.isConnected) {
      unsubscribe_in_eventbus_from_all_events(listChanged, selectedValueChanged, routeChanged);
    }
  }

  return customSelect;
}

function addEventListeners(input, setNewValueCallback, getSelectedValueCallback){

  input.addEventListener('change', () => {
    setNewValueCallback(input.value);
    input.blur();
  });

  input.addEventListener('focusin', () => {
    input.value = '';
  });

  input.addEventListener('focusout', () => {
    if (input.value === '') {
      input.value = getSelectedValueCallback();
    }
  });
}

function reduceListOptions(getListCallback) {
  let options = Object.keys(getListCallback());
  return options.reduce((p, optionValue) =>
    p + `<option value="${optionValue}">${optionValue}</option>`, '')
}