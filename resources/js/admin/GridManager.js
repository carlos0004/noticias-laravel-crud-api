// Importa los estilos de ag-grid
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { createGrid } from 'ag-grid-community';

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

    static async request(url, options) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error in request:", error);
            throw error;
        }
    }

    static async loadRecords(baseUrl, gridElementSelector, columns) {
        const options = { method: "GET" };
        const data = await this.request(baseUrl, options);
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

        this.rowImmutableStore = this.rowImmutableStore.map((oldItem) =>
            oldItem.id === newItem.id ? newItem : oldItem
        );
        this.gridApi.setGridOption("rowData", this.rowImmutableStore);

        const url = `${baseUrl}/${data.id}`;
        const dataToUpdate = { [field]: newValue };
        await this.updateCell(url, dataToUpdate);
    }

    static async updateCell(url, dataToUpdate) {
        const options = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataToUpdate),
        };
        return this.request(url, options);
    }

    static async delete(url) {
        const options = {
            method: "DELETE",
        }
        return this.request(url, options);
    }
}
