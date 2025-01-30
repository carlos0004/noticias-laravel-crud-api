
import { GridManager } from './GridManager.js';
import { CustomButtonComponent } from './CustomButtonComponent.js';
import './admin.js';


const columns = [
    { field: "id", hide: true },
    { field: 'titulo' },
    { field: 'contenido' },
    { field: 'nombre_categoria', headerName: 'Categoría' },
    { field: 'nombre_autor', headerName: 'Autor' },
    { field: "Acciones", cellRenderer: CustomButtonComponent, editable: false }
];


GridManager.init('api/noticias', '#myGrid', columns);


