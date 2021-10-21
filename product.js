export default class Product {
  constructor(code, name, quantity, cost) {
    this._code = code;
    this._name = name.toUpperCase();
    this._quantity = quantity;
    this._cost = cost;
    this._next = null;
    this._previous = null;
  }

  getName() {
    return this._name;
  }
  getCode() {
    return this._code;
  }

  getValue() {
    return this._quantity * this._cost;
  }
  infoHtml() {
    return `
        <div>
          <h3>
            ${this._code}-${this._name}
          </h3>
          <p>
        ${this._quantity} PIEZA(s) COSTO:${this._cost}$ 
          VALOR DE MERCANCIA: ${this.getValue()}$
        </p>
        </div>
        `;
  }
}
