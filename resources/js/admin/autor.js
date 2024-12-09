function request(url, options) {
    let data = [];
    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(json => {
                console.log(json);
                json.autores.forEach(element => {
                    data.push(element);
                });
                resolve(data);
            })
            .catch(error => {
                console.error('Error al obtener datos:', error); // Mostrar el error completo
                reject('Error al obtener datos:', error);
            });
    })
}


async function crearTabla() {
    // Configuración de la API
    const options = {
        method: "GET"
    };

    let data = await request('api/autores', options); // Esperar los datos de la API
    const gridOptions = {
        rowData: data, // Usar los datos obtenidos de la API
        columnDefs: [
            { field: "id" },
            { field: "nombre" },
            { field: "Acciones" }
        ],
        defaultColDef: {
            flex: 1,
        },
    };
    const myGridElement = document.querySelector('#myGrid');
    createGrid(myGridElement, gridOptions); // Crear la tabla con los datos
}

crearTabla();
