import { loadRecords } from './admin.js';


loadRecords('api/autores', [
    { field: "id" },
    { field: "nombre", headerName: "Nombre y apellidos" },
    { field: "Acciones" }
]);
