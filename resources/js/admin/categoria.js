import { GridManager } from './GridManager.js';
import { DeleteButtonComponent } from './DeleteButtonComponent.js';
import './admin.js';

const columns = [
    { field: "id", hide: true },
    { field: "nombre", headerName: "Nombre categoria" },
    { field: "Acciones", cellRenderer: DeleteButtonComponent, editable: false }
];

GridManager.init('api/categorias', '#myGrid', columns);
