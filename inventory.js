export default class Inventory {
  constructor() {
    this._start = null;
    this._end = null;
  }

  add(product) {
    if (this._start == null) {
      this._start = product;
      this._end = product;
      return true;
    }
    //No debe existir el producto y no debe superar el limite;
    if (!this.search(product.getCode()) && this._howMany() < 20) {
      //En caso de que vaya en la primera posicion;
      if (product.getCode() < this._start.getCode()) {
        product._next = this._start;
        this._start._previous = product;
        this._start = product;
        return true;
      } else {
        this._add(product, this._start);
        return true;
      }
    }
    return false;
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
      this._end = product;
    } else {
      //Si no se cumplen las codiciones probamos con el sig en la lista;
      this._add(product, aux._next);
    }
  }

  search(code) {
    let aux = this._start;
    let stop = false;
    while (aux != null && !stop) {
      if (code == aux.getCode()) {
        return aux;
      } else if (aux.getCode() > code) {
        stop = true;
      }
      aux = aux._next;
    }
    return null;
  }

  list() {
    if (this._start == null) {
      return `No hay productos`;
    } else {
      return this._list(this._start);
    }
  }

  _list(node) {
    if (node._next == null) {
      return node.infoHtml();
    } else {
      return `${node.infoHtml()} ${this._list(node._next)}`;
    }
  }

  inverseList() {
    if (this._start == null) {
      return `No hay productos`;
    } else {
      return this._inverseList(this._end);
    }
  }

  _inverseList(node) {
    if (node._previous == null) {
      return node.infoHtml();
    } else {
      return `${node.infoHtml()} ${this._inverseList(node._previous)}`;
    }
  }

  delete(code) {
    let aux = this._start;
    if (this._start == null) {
      return null; //En caso de que se quiera eliminar un codigo y no haya productos;
    }
    //En caso de que se quiera eliminar el inicio y sea el unico producto que hay;
    if (code == this._start.getCode() && this._start._next == null) {
      this._start = null;
      this._end = null;
      return aux;
    } else if (code == this._start.getCode()) {
      this._start = this._start._next;
      this._start._previous = null;
      aux._next = null;
      return aux;
    } else {
      return this._delete(code, this._start);
    }
  }

  _delete(code, node) {
    //Si ya pasamos el ultimo entonces el codigo no existe y no se elimina ningun producto;
    if (node == null) {
      return null;
    } else if (node._next == null && code == node.getCode()) {
      //Aplica este caso cuando se quiere eliminar el ultimo elemento;
      node._previous._next = null;
      this._end = node._previous;
      node._previous = null;
      return node;
    } else if (node.getCode() == code) {
      node._previous._next = node._next;
      node._next._previous = node._previous;
      node._next = null;
      node._previous = null;
      return node;
    } else {
      return this._delete(code, node._next);
    }
  }

  _howMany() {
    let aux = this._start;
    let count = 0;
    while (aux != null) {
      count++;
      aux = aux._next;
    }
    return count;
  }
}
