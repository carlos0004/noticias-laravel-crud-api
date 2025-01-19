import { loadRecords } from "./admin";

loadRecords('/api/noticias', [
    { field: 'id' },
    { field: 'titulo' },
    { field: 'contenido' },
    { field: 'nombre_categoria', headerName: 'Categoría' },
    { field: 'nombre_autor', headerName: 'Autor' },
    { field: 'Acciones' }
])

