import '../../css/admin/admin.css';

// Importa los estilos de ag-grid
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { createGrid } from 'ag-grid-community';

const sidebar = document.getElementById('sidebar');
const openClose = document.getElementById('menu');

openClose.addEventListener("click", () => { sidebar.classList.toggle('show'); });

function request(url, options) {
    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(json => {
                resolve(json);
            })
            .catch(error => {
                console.error('Error al obtener datos:', error); // Mostrar el error completo
                reject('Error al obtener datos:', error);
            });
    });
}

let rowImmutableStore;
let gridApi;

/**
 * Carga registros en una tabla dinámica.
 * @param {string} baseUrl - La URL base del endpoint.
 * @param {Array} columns - Definición de columnas para la tabla.
 */
export async function loadRecords(baseUrl, columns) {
    const options = {
        method: "GET"
    };

    rowImmutableStore = await request(baseUrl, options);
    rowImmutableStore = rowImmutableStore.result;

    const gridOptions = {
        rowData: rowImmutableStore,
        columnDefs: columns,
        defaultColDef: {
            flex: 1,
            minWidth: 100,
            editable: true,
        },
        readOnlyEdit: true,
        onCellEditRequest: (event) => onCellEditRequest(baseUrl, event),
    };

    const myGridElement = document.querySelector('#myGrid');
    gridApi = createGrid(myGridElement, gridOptions);
}

/**
 * Maneja la solicitud de edición de celda.
 * @param {string} baseUrl - La URL base del endpoint.
 * @param {object} event - Evento de edición de celda.
 */
async function onCellEditRequest(baseUrl, event) {
    const data = event.data;
    const field = event.colDef.field;
    const newValue = event.newValue;

    const oldItem = rowImmutableStore.find((row) => row.id === data.id);
    if (!oldItem || !field) {
        return;
    }

    const newItem = { ...oldItem };
    newItem[field] = newValue;

    console.log("onCellEditRequest, updating " + field + " to " + newValue);

    rowImmutableStore = rowImmutableStore.map((oldItem) =>
        oldItem.id === newItem.id ? newItem : oldItem
    );
    gridApi.setGridOption("rowData", rowImmutableStore);

    const url = `${baseUrl}/${data.id}`;
    const dataToUpdate = { [field]: newValue };
    await updateCell(url, dataToUpdate);
}

async function updateCell(url, dataToUpdate) {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToUpdate)
    };
    return request(url, options);
}
