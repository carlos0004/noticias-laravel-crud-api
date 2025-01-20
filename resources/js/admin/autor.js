import { GridManager } from './GridManager.js';
import './admin.js';


const columns = [
    { field: "id", hide: true },
    { field: "nombre", headerName: "Nombre y apellidos" },
    { field: "Acciones" }
];

const autoresGrid = new GridManager('api/autores', '#myGrid', columns);
autoresGrid.init();