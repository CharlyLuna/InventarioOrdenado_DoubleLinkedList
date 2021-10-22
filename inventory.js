export default class Inventory {
  constructor() {
    this._start = null;
  }

  add(product) {
    if (this._start == null) {
      this._start = product;
      return true;
    }
    //En caso de que vaya en la primera posicion;
    if (product.getCode() < this._start.getCode()) {
      product._next = this._start;
      this._start._previous = product;
      this._start = product;
      console.log(this._start);
      return true;
    } else {
      this._add(product, this._start);
      console.log(this._start);
      return true;
    }
  }
  //Se llama a la funcion recursiva si el producto no es el primero en la lista;
  _add(product, aux) {
    //Esto aplica si el producto no va ni al inicio ni al ultimo;
    if (aux.getCode() > product.getCode()) {
      product._next = aux;
      product._previous = aux._previous;
      aux._previous = product;
      product._previous._next = product;
    } else if (aux._next == null && aux.getCode() < product.getCode()) {
      //Esto aplica solo en caso de que vaya al ultimo;
      aux._next = product;
      product._previous = aux;
    } else {
      //Si no se cumplen las codiciones probamos con el sig en la lista;
      this._add(product, aux._next);
    }
  }
}
