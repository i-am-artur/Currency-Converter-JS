// HTML

export function htmlToDFragment(html) {
  return document.createRange().createContextualFragment(html);
}

export function htmlToElement(html) {
  return document.createRange().createContextualFragment(html)
    .firstElementChild;
}

//CSS

export function getCssVariable(cssVariableName) {
  return getComputedStyle(document.documentElement).getPropertyValue(
    `--${cssVariableName}`
  );
}

export function addClassToElement(element, css_class) {
  element.classList.add(css_class);
}

export function removeClassFromElement(element, css_class) {
  element.classList.remove(css_class);
}

// JS

export function random(min, max) {
  const maxUpperLimit = 1;

  return Math.floor(Math.random() * (max - min + maxUpperLimit) + min);
}

export function round(number, decimals) {
  return +(Math.round(number + `e+${decimals}`) + `e-${decimals}`);
}

export function copyObjectWithJSON(obj){
  return JSON.parse(JSON.stringify(obj));
}

