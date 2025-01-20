
import { GridManager } from './GridManager.js';
import './admin.js';


const columns = [
    { field: "id", hide: true },
    { field: 'titulo' },
    { field: 'contenido' },
    { field: 'nombre_categoria', headerName: 'Categoría' },
    { field: 'nombre_autor', headerName: 'Autor' },
    { field: 'Acciones' }
];

const autoresGrid = new GridManager('api/noticias', '#myGrid', columns);
autoresGrid.init();


