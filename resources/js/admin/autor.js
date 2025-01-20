import { GridManager } from './GridManager.js';
import { CustomButtonComponent } from './CustomButtonComponent.js';

import './admin.js';


const columns = [
    { field: "id", hide: true },
    { field: "nombre", headerName: "Nombre y apellidos" },
    { field: "Acciones", cellRenderer: CustomButtonComponent, editable: false }
];

GridManager.init('api/autores', '#myGrid', columns);