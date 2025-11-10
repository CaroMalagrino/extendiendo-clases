import * as fs from "fs";

class ListaDeCosas {
  name: string;
  cosas: Product[] = [];
  constructor(name: string, cosas: Product[] = []) {
    // nombre de esta lista
    this.name = name;
    this.cosas = cosas;
  }
  add(nuevaCosa: Product) {
    this.cosas.push(nuevaCosa);
  }
  getCosas() {
    return this.cosas;
  }
}

class Product {
  name: string;
  price: number;
  id: number;
  constructor(name: string, price: number, id: number) {
    this.name = name;
    this.price = price;
    this.id = id;
  }
}

class ListaDeProductos extends ListaDeCosas {
  constructor(name: string, cosas: Product[] = []) {
    super(name, cosas);

    const data = fs.readFileSync(__dirname + "/products.json", "utf-8");
    const productos = JSON.parse(data);

    productos.forEach((producto: Product) => {
      this.addProduct(producto);
    });
  }

  addProduct(product: Product): void {
    const validacionDeId = this.cosas.find((p) => p.id === product.id);
    if (!validacionDeId) {
      this.cosas.push(product);
    } else {
      console.error(`El producto con el id ${product.id} ya existe`);
    }
  }

  getProduct(id: number): Product | undefined {
    const productoEncontrado = this.cosas.find(
      (producto) => producto.id === id
    );
    return productoEncontrado;
  }

  removeProduct(id: number): void {
    const index = this.cosas.findIndex((producto) => producto.id === id);
    if (index !== -1) {
      this.cosas.splice(index, 1);
    } else {
      throw new Error(`Producto con id ${id} no encontrado`);
    }
  }

  getSortedByPrice(order: string): Product[] {
    const ordenar = this.cosas.sort((a, b) => {
      if (order === "asc") {
        return a.price - b.price;
      } else if (order === "desc") {
        return b.price - a.price;
      }
    });
    return ordenar;
  }
}

export { ListaDeProductos, Product };
