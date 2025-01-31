
import { GridManager } from './GridManager.js';
import { CustomButtonComponent } from './CustomButtonComponent.js';
import './admin.js';
import { request } from './request.js';

const autores = {};
let requestAutores = await request('api/autores');
requestAutores = requestAutores.result;
requestAutores.forEach((element) => {
    autores[element.id] = element.nombre;

});
const categorias = {};
let requesCategorias = await request('api/categorias');
requesCategorias = requesCategorias.result;
requesCategorias.forEach((element) => {
    categorias[element.id] = element.nombre
})
console.log(categorias);


function extractKeys(mappings) {
    return Object.keys(mappings);
}
function lookupValue(mappings, key) {
    return mappings[key];
}

function lookupKey(mappings, name) {
    const keys = Object.keys(mappings);

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        if (mappings[key] === name) {
            return key;
        }
    }
}
const columns = [
    { field: "id", hide: true },
    { field: 'titulo' },
    { field: 'contenido' },
    {
        field: 'nombre_categoria',
        headerName: 'Categoría',
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
            values: extractKeys(categorias)
        },
        // convert code to value
        valueFormatter: params => {
            return lookupValue(categorias, params.value);
        },
        // convert value to code
        valueParser: params => {
            return lookupKey(categorias, params.newValue);
        }
    },
    {
        field: 'nombre_autor',
        headerName: 'Autor',
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
            values: extractKeys(autores)
        },
        // convert code to value
        valueFormatter: params => {
            return lookupValue(autores, params.value);
        },
        // convert value to code
        valueParser: params => {
            return lookupKey(autores, params.newValue);
        }
    },
    { field: "Acciones", cellRenderer: CustomButtonComponent, editable: false }
];


GridManager.init('api/noticias', '#myGrid', columns);


