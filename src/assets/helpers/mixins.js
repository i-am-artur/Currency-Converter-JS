import {unsubscribe_in_eventbus_from_all_events} from '../../app/event-bus';

export function unsubscribe_functions_from_eventBus(component, ...args) {
  if (!component.isConnected) {
    unsubscribe_in_eventbus_from_all_events(...args);
  }
}