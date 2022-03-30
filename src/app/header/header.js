import './header.scss';
import { htmlToElement } from '@assets/helpers/common';
import {routes} from '../router';

function getTemplate() {
  return `
    <header class="header">
      <h1 class="logo">Currency Box</h1>
      <nav class="nav">
        <ul class="menu">
          <li>
            <a class="menu__link" href="${routes.home.link}">Currency Converter</a>
          </li>
          <li>
            <a class="menu__link" href="${routes.exchange.link}">Exchange Rates</a>
          </li>
        </ul>
      </nav>
    </header>
  `;
}

export default function () {
  return htmlToElement(getTemplate());
}
