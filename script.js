
function mostrarFormularioIn() {
    const divPrincipal = document.querySelector("#contenedorForm");
    const formularioHTML = `
      <form id="nuevoIngForm" name=""Formulario de Ingreso">
        <h3>Formulario de Ingreso</h3>
        <label for="sku">SKU:</label>
        <input type="number" id="sku" required><br>
        <label for="descripcion">Descripción:</label>
        <input type="text" id="descripcion" required><br>
        <label for="cantidad">Cantidad:</label>
        <input type="number" id="cantidad" required><br>
        <button type="submit">Enviar</button>
      </form>
    `;
    divPrincipal.innerHTML = formularioHTML;

    const nuevoIngForm = document.getElementById('nuevoIngForm');
    const skuIn = document.getElementById("sku");
    const descripcionIn = document.getElementById("descripcion");
    const cantidadIn = document.getElementById("cantidad");

    skuIn.addEventListener("blur", function () {
        const skuVal = skuIn.value;

        // Verificar si el SKU ya existe en el web storage
        const listaProductos = JSON.parse(localStorage.getItem('listaProductos')) || [];
        const productoExistente = listaProductos.find(producto => producto.SKU === parseInt(skuVal));

        if (productoExistente) {
            // Si el SKU ya existe, autocompletar la descripción y mostrar la cantidad existente
            descripcionIn.value = productoExistente.Descripcion;

            cantidadIn.focus();
        }
    });

    nuevoIngForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Obtener valores del formulario
        const sku = parseInt(document.getElementById('sku').value);
        const descripcion = document.getElementById('descripcion').value;
        const cantidad = parseInt(document.getElementById('cantidad').value);

        // Validar que la cantidad sea mayor o igual a cero
        if (cantidad < 1 ){
            swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La cantidad ingresada debe ser mayor a cero ',
                timer: 1500,
                
              })
            return;
        }

        // Cargar lista de productos desde el localStorage o crear un array vacío
        let listaProductos = JSON.parse(localStorage.getItem('listaProductos')) || [];
        const productoExistente = listaProductos.find(producto => producto.SKU === sku);

        if (productoExistente) {
            // Si el producto ya existe, sumar la cantidad ingresada a la cantidad existente
            productoExistente.Cantidad += cantidad;
            productoExistente.Descripcion = descripcion;
        } else {
            // Si el producto no existe, agregarlo como un nuevo producto
            const nuevoProducto = {
                SKU: sku,
                Descripcion: descripcion,
                Cantidad: cantidad,
                // Rotacion: rotacion,
            };
            listaProductos.push(nuevoProducto);
        }

        // Guardar lista de productos actualizada en el localStorage
        localStorage.setItem('listaProductos', JSON.stringify(listaProductos));

        // Limpiar formulario
        nuevoIngForm.reset();

        Toastify({
            text: "Producto ingresado correctamente",
            duration: 3000,
            gravity: "bottom", 
            position: "center", 
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();
    });
}

function mostrarFormularioDesp() {
    const divPrincipal = document.querySelector("#contenedorForm");
    const formularioHTML = `
      <form id="nuevoDespForm">
      <h3>Formulario de Despacho</h3>
        <label for="sku">SKU:</label>
        <input type="number" id="sku" required><br>
        <label for="descripcion">Descripción:</label>
        <input type="text" id="descripcion" required><br>
        <label for="cantidad">Cantidad:</label>
        <input type="number" id="cantidad" required><br>
        <button type="submit">Enviar</button>
      </form>
    `;
    divPrincipal.innerHTML = formularioHTML;

    const nuevoDespForm = document.getElementById('nuevoDespForm');
    const skuOut = document.getElementById("sku");
    const descripcionOut = document.getElementById("descripcion");
    const cantidadOut = document.getElementById("cantidad");

    skuOut.addEventListener("blur", function () {
        const skuVal = skuOut.value;

        // Verificar si el SKU ya existe en el web storage
        const listaProductos = JSON.parse(localStorage.getItem('listaProductos')) || [];
        const productoExistente = listaProductos.find(producto => producto.SKU === parseInt(skuVal));

        if (productoExistente) {
            // Si el SKU ya existe, autocompletar la descripción y mostrar la cantidad existente
            descripcionOut.value = productoExistente.Descripcion;
            cantidadOut.focus();
        } else {
            alert("Código de producto incorrecto, por favor ingrese uno válido");
            skuOut.value = "";
        }



    });

    nuevoDespForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Obtener valores del formulario
        const sku = parseInt(document.getElementById('sku').value);
        const descripcion = document.getElementById('descripcion').value;
        const cantidad = parseInt(document.getElementById('cantidad').value);


        // Cargar lista de productos desde el localStorage o crear un array vacío
        let listaProductos = JSON.parse(localStorage.getItem('listaProductos')) || [];
        const productoExistente = listaProductos.find(producto => producto.SKU === sku);

        if (productoExistente && productoExistente.Cantidad >= cantidad && cantidad > 0) {
            // Si el producto ya existe, sumar la cantidad ingresada a la cantidad existente
            productoExistente.Cantidad -= cantidad;
            productoExistente.Descripcion = descripcion;

            // Guardar lista de productos actualizada en el localStorage
            localStorage.setItem('listaProductos', JSON.stringify(listaProductos));
            nuevoDespForm.reset();

            Toastify({
                text: "Despacho Exitoso",
                duration: 3000,
                gravity: "bottom", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
            }).showToast();

        } else {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Saldo insuficiente, por favor ingrese una cantidad menor o igual a: ' + productoExistente.Cantidad,
                
              })

            cantidadOut.focus();
            cantidadOut.value = "";
        }
    });
}

function mostrarFormularioStock() {
    const divPrincipal = document.querySelector("#contenedorForm");
    const formularioHTML = `
      <input type="text" id="buscador" placeholder="Ingrese los datos del producto">
      <select id="filtro">
        <option value="sku">Por SKU</option>
        <option value="descripcion">Por Descripción</option>
        <option value="cantidad">Por Cantidad</option>
      </select>
      <div id="resultado"></div>
    `;
    divPrincipal.innerHTML = formularioHTML;

    const buscador = document.getElementById("buscador");
    const filtro = document.getElementById("filtro");
    const resultadoDiv = document.getElementById("resultado");

    // Función para mostrar los productos filtrados según el criterio seleccionado
    function mostrarProductosFiltrados(criterio, valor) {
        const listaProductos = JSON.parse(localStorage.getItem('listaProductos')) || [];

        // Filtrar los productos según el criterio seleccionado
        const productosFiltrados = listaProductos.filter(producto => {
            if (criterio === "sku") {
                return producto.SKU.toString().includes(valor);
            } else if (criterio === "descripcion") {
                return producto.Descripcion.toLowerCase().includes(valor.toLowerCase());
            } else if (criterio === "cantidad") {
                return producto.Cantidad.toString().includes(valor);
            }
        });
        // Generar el HTML para mostrar los productos filtrados
        let htmlResult = "<h3>Productos encontrados:</h3>";
        htmlResult += "<table>";
        htmlResult += "<tr><th>SKU</th><th>Descripción</th><th>Cantidad</th></tr>";

        productosFiltrados.forEach(producto => {
            htmlResult += `<tr><td>${producto.SKU}</td><td>${producto.Descripcion}</td><td>${producto.Cantidad}</td></tr>`;
        });

        htmlResult += "</table>";
        // Mostrar los resultados en el div con id="resultado"
        resultadoDiv.innerHTML = htmlResult;
    }
    // Agregar evento de búsqueda cuando se modifica el valor del buscador o el filtro
    buscador.addEventListener("input", () => {
        const criterio = filtro.value;
        const valor = buscador.value;
        mostrarProductosFiltrados(criterio, valor);
    });

    filtro.addEventListener("change", () => {
        const criterio = filtro.value;
        const valor = buscador.value;
        mostrarProductosFiltrados(criterio, valor);
    });

}
