import {htmlToElement} from '@assets/helpers/common';
import EventBus from '../../event-bus';
import {unsubscribe_functions_from_eventBus} from '@assets/helpers/mixins';

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
    input.value = getSelectedValueCallback();
  }

  EventBus.subscribe(eventListChangedStr, listChanged);
  function listChanged() {
    input.list.innerHTML = reduceListOptions(getListCallback);
  }

  let routeChanged = () =>
    unsubscribe_functions_from_eventBus(customSelect, listChanged, selectedValueChanged, routeChanged);
  EventBus.subscribe(EventBus.eventNames.routeChanged, routeChanged);

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