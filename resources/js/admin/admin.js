import '../../css/admin/admin.css'

// Importa los estilos de ag-grid
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { createGrid } from 'ag-grid-community';

const sidebar = document.getElementById('sidebar');
const openClose = document.getElementById('menu');

openClose.addEventListener("click", () => { sidebar.classList.toggle('show'); })


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
                json.result.forEach(element => {
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


export async function loadRecords(url, columns) {
    // Configuración de la API
    const options = {
        method: "GET"
    };

    let data = await request(url, options); // Esperar los datos de la API
    const gridOptions = {
        rowData: data, // Usar los datos obtenidos de la API
        columnDefs: columns,
        defaultColDef: {
            flex: 1,
        },
    }; // Obtener la configuración de la tabla


    const myGridElement = document.querySelector('#myGrid');
    createGrid(myGridElement, gridOptions); // Crear la tabla con los datos
}