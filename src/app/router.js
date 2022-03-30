import EventBus from './event-bus';

// import {production_publicPath} from "../../webpack.config";

// let routes = {
//   home: {
//     link: '/',
//     module: './converter/converter'
//   },
//   exchange: {
//     link: '/exchange',
//     module: './exchange/exchange'
//   }
// };
//
// let routeModules = [];
// console.log(routes.exchange.module)
// routeModules[routes.home.link] = () => import(/* webpackChunkName: "converter" */ routes.home.module );
// routeModules[routes.exchange.link] = () => import(/* webpackChunkName: "exchange" */ routes.exchange.module);
// routeModules[routes.exchange.link] = () => import(/* webpackChunkName: "exchange" */ './exchange/exchange');

const publicPath = '/Portfolio/currency-converter';

export const routes = {
  home: {
    link: publicPath + '/',
    importModule: () => import(/* webpackChunkName: "converter" */ './converter/converter')
  },
  exchange: {
    link: publicPath + '/exchange',
    importModule: () => import(/* webpackChunkName: "exchange" */ './exchange/exchange')
  }
};

let routerView;

export default function(routerViewAnchor) {
  routerView = routerViewAnchor;
  addRouteListeners();
}

function loadView() {

  // let viewToLoad = routeModules[location.pathname];

  // if (viewToLoad) {
  //   viewToLoad().then(viewModule => {
  //     let view = viewModule.default();
  //     routerView.replaceWith(view);
  //     routerView = view;
  //     EventBus.publish(EventBus.eventNames.routeChanged);
  //   });
  // }

  let route = getRouteAccordingToLocation();

  if (route) {
    route.importModule().then(viewModule => {
      let view = viewModule.default();
      routerView.replaceWith(view);
      routerView = view;
      EventBus.publish(EventBus.eventNames.routeChanged);
    });
  }
  // else if(route includes server-name and no route then 404)
}

function getRouteAccordingToLocation() {
  for (let key in routes) {
    if (routes.hasOwnProperty(key)) {
      if (routes[key].link.includes(location.pathname)) {
        return routes[key];
      }
    }
  }

  return null;
}

function addRouteListeners() {
  window.addEventListener('popstate', () => {
    loadView();
  });

  document.body.addEventListener('click', function(event) {
    let clickedTarget = event.target;
    if(isClickedTargetInRoutesList(clickedTarget)) {
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
        if(routes[key].link === linkHREF) {
          return true;
        }
      }
    }
  }

  return false;
}
// function isClickedTargetInRoutesList(clickedTarget) {
//   let linkHREF = clickedTarget.getAttribute('href');
//   if(linkHREF) {
//     for(let key in routeModules){
//       if (routeModules.hasOwnProperty(key)) {
//         if(key === linkHREF) {
//           return true;
//         }
//       }
//     }
//   }
//
//   return false;
// }