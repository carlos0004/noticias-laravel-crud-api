import { GridManager } from './GridManager.js';
import { DeleteButtonComponent } from './DeleteButtonComponent.js';

import './admin.js';


const columns = [
    { field: "id", hide: true },
    { field: "nombre", headerName: "Nombre y apellidos" },
    { field: "Acciones", cellRenderer: DeleteButtonComponent, editable: false }
];

GridManager.init('api/autores', '#myGrid', columns);