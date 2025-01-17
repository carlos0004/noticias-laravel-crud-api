import '../../css/admin/admin.css'

// Importa los estilos de ag-grid
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

import { createGrid } from 'ag-grid-community';
window.createGrid = createGrid;

const sidebar = document.getElementById('sidebar');
const openClose = document.getElementById('menu');

openClose.addEventListener("click", () => { sidebar.classList.toggle('show'); })

console.log("holaa");

function request(url, options) {
    let data = [];
    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(json => {
                console.log(json);
                json.autores.forEach(element => {
                    data.push(element);
                });
                resolve(data);
            })
            .catch(error => {
                console.error('Error al obtener datos:', error); // Mostrar el error completo
                reject('Error al obtener datos:', error);
            });
    })
}


async function loadRecords(url, callback) {
    // Configuración de la API
    const options = {
        method: "GET"
    };

    let data = await request(url, options); // Esperar los datos de la API
    const gridOptions = callback(data); // Obtener la configuración de la tabla


    const myGridElement = document.querySelector('#myGrid');
    createGrid(myGridElement, gridOptions); // Crear la tabla con los datos
}