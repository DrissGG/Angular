export default class DigiCardComponent extends HTMLElement {
  constructor() {
    super();
    const template = document.querySelector('#card-template');
    const clonedTemplate = document.importNode(template.content, true);
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(clonedTemplate);

    console.log(`Dans le constructeur de la carte`);
  }
}