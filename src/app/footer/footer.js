import './footer.scss';
import { htmlToElement } from '@assets/helpers/common';

function getTemplate() {
  return `
    <footer class="footer">
      I am { Artur } &copy; 2022
    </footer>
  `;
}

export default function () {
  return htmlToElement(getTemplate());
}
