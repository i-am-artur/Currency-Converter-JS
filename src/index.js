import '@assets/scss/common.scss';

// import EventBus from './app/event-bus';
import router from './app/router';

import createHeader from './app/header/header';
import {htmlToElement} from '@assets/helpers/common';

let routerViewAnchor = htmlToElement(`<div></div>`);
router(routerViewAnchor);

document.body.appendChild(createHeader());
document.body.appendChild(routerViewAnchor);