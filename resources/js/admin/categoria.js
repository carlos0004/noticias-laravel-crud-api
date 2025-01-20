import { GridManager } from './GridManager.js';
import './admin.js';


const columns = [
    { field: "id", hide: true },
    { field: "nombre", headerName: "Nombre categoria" },
    { field: "Acciones" }
];

const autoresGrid = new GridManager('api/categorias', '#myGrid', columns);
autoresGrid.init();