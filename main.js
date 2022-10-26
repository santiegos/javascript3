class Entradas {
    constructor(id, mes, precio, img) {
      this.id = id;
      this.mes = mes;
      this.precio = precio;
      this.img = img;
      this.cantidad = 1;
    }
  }

const octubre = new Entradas(1, 'Octubre', 100, 'img/Screenshot_20221025-141222_2.png');
const noviembre = new Entradas(2, 'Noviembre', 50, 'img/Screenshot_20221025-141233_2.png');
const diciembre = new Entradas(3, 'Diciembre', 80, 'img/Screenshot_20221025-141244_2.png');

// Array 

const entradas = [octubre, noviembre, diciembre];

// array carrito

let carrito = [];


if (localStorage.getItem('carrito')) {
  carrito = JSON.parse(localStorage.getItem('carrito'));
}

//Modificacion del DOM mostrando los productos:

const contenedorProductos = document.getElementById('contenedorProductos');

//  función para mostrar los productos:

const mostrarProductos = () => {
  entradas.forEach((entrada) => {
    const card = document.createElement('div');
    card.classList.add('col-xl-3', 'col-md-6', 'col-xs-12');
    card.innerHTML = `
            <div class="card">
                <img src="${entrada.img}" class="card-img-top imgProductos" alt="${entrada.mes}">
                <div class="card-body">
                <h5 class="card-title"> ${entrada.mes} </h5>
                <p class="card-text"> ${entrada.precio} </p>
                <button class="btn colorBoton" id="boton${entrada.id}"> Agregar al Carrito </button>
                </div>
            </div>
        `;
    contenedorProductos.appendChild(card);

    //Agregar productos al carrito:
    const boton = document.getElementById(`boton${entrada.id}`);
    boton.addEventListener('click', () => {
      agregarAlCarrito(entrada.id);
    });
  });
};

//Función agregar al carrito:

const agregarAlCarrito = (id) => {
  const entrada = entradas.find((entrada) => entrada.id === id);
  const productoEnCarrito = carrito.find((entrada) => entrada.id === id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push(entrada);
    //Al final de la clase, guardamos en el localStorage.
    //Trabajamos con el localStorage:
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }
  calcularTotal();
};

mostrarProductos();

//MOSTRAR EL CARRITO DE COMPRAS:

const contenedorCarrito = document.getElementById('contenedorCarrito');

const verCarrito = document.getElementById('verCarrito');

verCarrito.addEventListener('click', () => {
  mostrarCarrito();
});

//Función para mostrar el Carrito:

const mostrarCarrito = () => {
  contenedorCarrito.innerHTML = '';
  carrito.forEach((entrada) => {
    const card = document.createElement('div');
    card.classList.add('col-xl-3', 'col-md-6', 'col-xs-12');
    card.innerHTML = `
            <div class="card">
                <img src="${entrada.img}" class="card-img-top imgProductos" alt="${entrada.mes}">
                <div class="card-body">
                <h5 class="card-title"> ${entrada.mes} </h5>
                <p class="card-text"> ${entrada.precio} </p>
                <p class="card-text"> ${entrada.cantidad} </p>
                <button class="btn colorBoton" id="eliminar${entrada.id}"> Eliminar Producto </button>
                </div>
            </div>
        `;
    contenedorCarrito.appendChild(card);

    //Eliminar productos del carrito:
    const boton = document.getElementById(`eliminar${entrada.id}`);
    boton.addEventListener('click', () => {
      eliminarDelCarrito(entrada.id);
    });
  });
  calcularTotal();
};

//Función que elimina el producto del carrito:

const eliminarDelCarrito = (id) => {
  const entrada = carrito.find((entrada) => entrada.id === id);
  const indice = carrito.indexOf(entrada);
  carrito.splice(indice, 1);
  mostrarCarrito();

  //LocalStorage:
  localStorage.setItem('carrito', JSON.stringify(carrito));
};

//Vaciamos todo el carrito de compras:

const vaciarCarrito = document.getElementById('vaciarCarrito');

vaciarCarrito.addEventListener('click', () => {
  eliminarTodoElCarrito();
});

//Función para eliminar todo el carrito:

const eliminarTodoElCarrito = () => {
  carrito = [];
  mostrarCarrito();

  //LocalStorage.
  localStorage.clear();
};

//Mostramos mensaje con el total de la compra

const total = document.getElementById('total');

const calcularTotal = () => {
  let totalCompra = 0;
  carrito.forEach((entrada) => {
    totalCompra += entrada.precio * entrada.cantidad;
    //+= es igual a poner totalCompra = totalCompra + producto.precio * producto.cantidad;
  });
  total.innerHTML = `Total: $${totalCompra}`;
};
