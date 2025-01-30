// Importa los estilos de ag-grid
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { createGrid } from 'ag-grid-community';
import { request } from './request';
import Swal from 'sweetalert2';

export class GridManager {
    static rowImmutableStore = [];
    static gridApi = null;
    static url = "";

    static async init(baseUrl, gridElementSelector, columns) {
        try {
            this.url = baseUrl;
            await this.loadRecords(baseUrl, gridElementSelector, columns);
        } catch (error) {
            console.error("Error initializing grid:", error);
        }
    }



    static async loadRecords(baseUrl, gridElementSelector, columns) {
        const options = { method: "GET" };
        const data = await request(baseUrl, options);
        console.log(data);

        this.rowImmutableStore = data.result;

        const gridOptions = {
            rowData: this.rowImmutableStore,
            columnDefs: columns,
            defaultColDef: {
                flex: 1,
                minWidth: 100,
                editable: true,
                enableCellChangeFlash: true,
            },
            getRowId: (params) => String(params.data.id),
            readOnlyEdit: true,
            onCellEditRequest: (event) => this.onCellEditRequest(baseUrl, event),
        };

        const myGridElement = document.querySelector(gridElementSelector);
        this.gridApi = createGrid(myGridElement, gridOptions);
    }

    static async onCellEditRequest(baseUrl, event) {
        const data = event.data;
        const field = event.colDef.field;
        const newValue = event.newValue;

        const oldItem = this.rowImmutableStore.find((row) => row.id === data.id);
        if (!oldItem || !field) {
            return;
        }

        const newItem = { ...oldItem };
        newItem[field] = newValue;



        const url = `${baseUrl}/${data.id}`;
        const dataToUpdate = { [field]: newValue };
        let result = await this.updateCell(url, dataToUpdate);
        if (result.status != 200) {
            Swal.fire({
                text: result.message,
                icon: "error",
            });
        } else {
            this.rowImmutableStore = this.rowImmutableStore.map((oldItem) =>
                oldItem.id === newItem.id ? newItem : oldItem
            );
            this.gridApi.setGridOption("rowData", this.rowImmutableStore);
            Swal.fire({
                text: result.message,
                icon: "success",
            });
        }
        console.log(result);

    }

    static async updateCell(url, dataToUpdate) {
        const options = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataToUpdate),
        };
        return request(url, options);
    }

    static async delete(url) {
        const options = {
            method: "DELETE",
        };
        return request(url, options);;
    }
}   
