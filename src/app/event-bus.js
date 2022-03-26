const EventBus = {
  eventNames: {
    baseCurrencyChanged: 'base currency change',
    secondCurrencyChanged: 'second currency change',
    currenciesListChanged: 'currencies list change',
    routeChanged: 'route changed'
  },
  events: {},
  subscribe (event, callbackFunction) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callbackFunction);
  },

  publish (event, data) {
    const callBacks = this.events[event];
    if (!callBacks || !callBacks.length) {
      return;
    }

    callBacks.forEach(callbackFunction => {
      callbackFunction(data)
    });
  },

  unsubscribeInAllEvents(callbackFunctionArg) {
    for(let event in this.events) {
      if (this.events.hasOwnProperty(event)) {
        this.events[event] = this.events[event].filter(callBack => callBack !== callbackFunctionArg);
      }
    }
    // console.log(this.events);
  }
};

export default EventBus;

export function unsubscribe_in_eventbus_from_all_events(){
  let callBacks = [...arguments];
  callBacks.forEach(callBack => EventBus.unsubscribeInAllEvents(callBack));
}