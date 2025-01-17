import { loadRecords } from './admin.js';


loadRecords('api/categorias', [
    { field: "id" },
    { field: "nombre" },
]);
