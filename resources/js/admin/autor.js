import { loadRecords } from './admin.js';


loadRecords('api/autores', [
    { field: "id" },
    { field: "nombre" },
    { field: "Acciones" }
]);
