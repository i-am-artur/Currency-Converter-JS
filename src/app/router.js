import EventBus from './event-bus';

let routes = [];
let converterModule = './converter/converter';
routes['/'] = () => import(/* webpackChunkName: "converter" */ `${converterModule}` );
routes['/converter'] = () => import(/* webpackChunkName: "converter" */ `${converterModule}`);
routes['/exchange'] = () => import(/* webpackChunkName: "exchange" */ './exchange/exchange');

let routerView;

export default function(routerViewAnchor) {
  routerView = routerViewAnchor;
  addRouteListeners();
}

function loadView() {
  let viewToLoad = routes[location.pathname];
  if (viewToLoad) {
    viewToLoad().then(viewModule => {
      let view = viewModule.default();
      routerView.replaceWith(view);
      routerView = view;
      EventBus.publish(EventBus.eventNames.routeChanged);
    });
  }
  // else if(route includes server-name and no route then 404)
}

function addRouteListeners() {
  window.addEventListener('popstate', () => {
    loadView();
  });

  document.body.addEventListener('click', function(event) {
    let clickedTarget = event.target;
    if(isClickedTargetInRoutesList(clickedTarget, routes)) {
      event.preventDefault();
      history.pushState(null, null, clickedTarget['href']);
      loadView();
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    loadView();
  });
}

function isClickedTargetInRoutesList(clickedTarget) {
  let linkHREF = clickedTarget.getAttribute('href');
  if(linkHREF) {
    for(let key in routes){
      if (routes.hasOwnProperty(key)) {
        if(key === linkHREF) {
          return true;
        }
      }
    }
  }

  return false;
}