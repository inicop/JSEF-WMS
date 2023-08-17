const url = './assets/js/db.json';

cargarYGuardarDatos();

const btnInicio = document.getElementById('btnInicio');
btnInicio.addEventListener('click', mostrarDashboard);

const btnIngresar = document.getElementById('btnIngresar');
btnIngresar.addEventListener('click', mostrarFormularioIn);

const btnDespachar = document.getElementById('btnDespachar');
btnDespachar.addEventListener('click', mostrarFormularioDesp);

const btnStock = document.getElementById('btnStock');
btnStock.addEventListener('click', mostrarFormularioStock);





