import '@assets/scss/common.scss';

import router from './app/router';

import createHeader from './app/header/header';
import createFooter from './app/footer/footer';
import {htmlToElement} from '@assets/helpers/common';

let routerViewAnchor = htmlToElement(`<div></div>`);
router(routerViewAnchor);

document.body.appendChild(createHeader());
document.body.appendChild(routerViewAnchor);
document.body.appendChild(createFooter());
