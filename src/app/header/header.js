import { htmlToElement } from '@assets/helpers/common';
import './header.scss';

function getTemplate() {
  return `
    <header class="header">
      <h1 class="logo">Currency Box</h1>
      <nav class="nav">
        <ul class="menu">
          <li>
            <a class="menu__link" href="/converter">Currency Converter</a>
          </li>
          <li>
            <a class="menu__link" href="/exchange">Exchange Rates</a>
          </li>
        </ul>
      </nav>
    </header>
  `;
}

export default function () {
  return htmlToElement(getTemplate());
}
